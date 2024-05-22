import { Request, Response, query } from "express";
import {
  findNearbyLocations,
  getCoverPhoto,
  getRandomElement,
} from "../helpers/helper";
import RepositoryHelper from "../helpers/repositoryHelper";
import { LessThan, Repository } from "typeorm";
import { FoodEntity } from "../entities/food.entity";
import { DrinkEntity } from "../entities/drinks.entity";
import { PackageListEntity } from "../entities/packageList.entity";

interface CustomRequest extends Request {
  user?: any; // Define the user property as optional
}

// interface Location {
//   lat: number;
//   lon: number;
//   price: number;
// }

class PackageController {
  static async createNewPackage(request: CustomRequest, response: Response) {
    try {
      //get userinfo from middleware
      const user = request.user;

      const { email } = user;

      const userinfo = await RepositoryHelper.userRepo.findOne({
        where: { email },
      });

      //location needs to be {  lat: number; lon: number;price: number;}
      const { coordinates, budget, numOfGuests, drink, food } = request.body;

      if (!coordinates || !budget || !numOfGuests || !drink || !food) {
        console.log("All the information needed for recommendation");
        return;
      }
      //form venue data to Location data format
      const venueLocations = await RepositoryHelper.venueRepo.find();

      const vennueData = venueLocations.map((venue) => {
        return {
          lat: venue.location[0],
          lon: venue.location[1],
          price: venue.price,
          id: venue.id,
          numOfG: venue.numOfPeople,
        };
      });

      // console.log(vennueData);
      const venueBudge = parseInt(budget) * 0.4;

      //format coordinates with budget from req.body
      const reqCoordinatesData = {
        lat: coordinates[0],
        lon: coordinates[1],
        price: venueBudge,
        id: 0,
        numOfG: numOfGuests,
      };
      // find the venue around 20% of budget, because the total will be multiply 3 for 3 hours rental and near location and can accormandate all the guests
      const nearbyLocations = findNearbyLocations(
        reqCoordinatesData,
        vennueData,
        500
      );

      const randomVenue = getRandomElement(nearbyLocations);

      //find the venue info by querying the db
      const selectedVenue = await RepositoryHelper.venueRepo.findOne({
        where: { id: randomVenue.id },
      });
      console.log(JSON.stringify(selectedVenue) + "!!!!!"); //tested
      //caculate a pack of drink for 10 people budget 10% and food budget 10% based on number of guests
      const drinkBudget = parseInt(budget) * 0.2;
      //return drink object drink{name, price }
      const drinkData = await RepositoryHelper.drinkRepo.find();
      // console.log(drinkData);
      //based on numOfGuest to caculate how many packs needed
      const numOfPacks = numOfGuests / 10;
      let selectedDrink: DrinkEntity[] = [];
      let drinkTotal: number = 0;
      if (numOfPacks >= 2) {
        const drinksByCategory = drink.map((cat) => {
          return drinkData.filter(
            (d) => d.price <= drinkBudget && d.category === cat
          );
        });

        // Randomly select one drink from each filtered category
        selectedDrink = drinksByCategory
          .map((drinks) => {
            if (drinks.length === 0) return null; // No drinks in this category

            const randomIndex = Math.floor(Math.random() * drinks.length);

            return drinks[randomIndex];
          })
          .filter((drink) => drink !== null); // Remove any null values (categories with no drinks)

        // const remainOfPacks = numOfPacks - 2;

        for (let i = selectedDrink.length; i < numOfPacks; i++) {
          const randomIndex = Math.floor(Math.random() * drinkData.length);
          const randomDrink = drinkData[randomIndex];
          if (!selectedDrink.includes(randomDrink)) {
            selectedDrink.push(randomDrink);
          } else {
            i--;
          }
        }
      } else {
        const selectedDrinkData = drinkData.filter((d) => {
          return d.price <= drinkBudget && drink.includes(d.category);
        });
        selectedDrink.push(getRandomElement(selectedDrinkData));
      }

      console.log(">>>>" + JSON.stringify(selectedDrink) + "<<<<<");

      //change map to reduce function and solve when there's only one drink what will happen?
      if (selectedDrink.length > 0) {
        const arr = selectedDrink.map((s) => s.price.toString());
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          drinkTotal += parseFloat(arr[i]);
        }
      }

      console.log(drinkTotal);

      //food
      const foodBudget = parseInt(budget) * 0.2;
      const foodData = await RepositoryHelper.foodRepo
        .createQueryBuilder("entity")
        .where("entity.foodchoice IN (:...food)", { food })
        .andWhere("entity.price <= :price", { price: foodBudget })
        .getMany();

      let selectedFood: FoodEntity[] = [];
      let foodTotal = 0;
      for (let i = 0; i < numOfPacks; i++) {
        const randomIndex = Math.floor(Math.random() * foodData.length);
        const randomFood = foodData[randomIndex];
        if (!selectedFood.includes(randomFood)) {
          selectedFood.push(randomFood);
        } else {
          i--;
        }
      }
      console.log(">>>>" + JSON.stringify(selectedFood) + "SELECTED FOOD<<<<");
      const arrFood = selectedFood.map((s) => s.price.toString());

      for (let i = 0; i < arrFood.length; i++) {
        foodTotal += parseFloat(arrFood[i]);
      }
      console.log(foodTotal + ">>>>>");

      if (selectedVenue) {
        const totalPrice =
          parseFloat(selectedVenue.price.toString()) * 3 +
          drinkTotal +
          foodTotal;
        console.log(totalPrice);

        //get a coverphoto
        let coverlink = "";
        //create a newpackage
        let newPackage = new PackageListEntity();

        getCoverPhoto()
          .then((res) => {
            coverlink = res;
            newPackage.coverphotolink = coverlink;
            newPackage.price = totalPrice;
            newPackage.creator = user;
            newPackage.venues = selectedVenue;
            newPackage.drinks = selectedDrink;
            newPackage.foods = selectedFood;

            if (userinfo) {
              newPackage.creator = userinfo;
              newPackage.save().then((res) => {
                //save info to db and return it to frontendd
                response.json({
                  data: newPackage,
                });
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      // return response.status(error.statusCode).send(error.);
      console.log(error);
    }
  }

  static async fetchAllPackages(request: Request, response: Response) {
    try {
      const query = RepositoryHelper.packageListRepo
        .createQueryBuilder("entity")
        .leftJoinAndSelect("entity.venues", "venues");

      const packages = await query.orderBy("entity.id", "DESC").getMany();
      response.json({
        data: packages,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchPackageByPackageId(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.packageId);

      const foundPackage = await RepositoryHelper.packageListRepo.findOne({
        where: { id },
        relations: ["venues", "drinks", "foods"],
      });
      // console.log(foundPackage);
      response.json({
        data: foundPackage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchPackagesByUser(request: CustomRequest, response: Response) {
    try {
      const user = request.user;

      const { email } = user;

      const userinfo = await RepositoryHelper.userRepo.findOne({
        where: { email },
      });

      const id = userinfo?.id;
      console.log(id + "USERID!!!");

      const userPackagelist = await RepositoryHelper.packageListRepo.find({
        where: { creator: { id } },
        relations: ["creator", "venues"],
      });

      response.json({
        userPackagelist,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async likeOnePackage(request: CustomRequest, response: Response) {
    try {
      const user = request.user;
      const packageId = parseInt(request.params.packageId);

      //find user
       const { email } = user;

       const userinfo = await RepositoryHelper.userRepo.findOne({
         where: { email },
       });
      
      
      //add packageid to the likesPackage
      userinfo?.likesPackages.add({
         packageId : packageId
      })
      console.log(userinfo?.likesPackages);
      //find package
      const packageInfo = await RepositoryHelper.packageListRepo.findOne({ where: { id: packageId } });
      const likes =  packageInfo?.likes
      // { packageInfo?.likes++; }
     
      
      
    } catch (error) {
      
    }
  }
}

export default PackageController;
