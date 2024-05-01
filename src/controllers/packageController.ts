import { Request, Response, query } from "express";
import { findNearbyLocations, getRandomElement } from "../helpers/helper";
import RespositoryHelper from "../helpers/repositoryHelper";
import { Repository } from "typeorm";
import { FoodEntity } from "../entities/food.entity";
import { DrinkEntity } from "../entities/drinks.entity";

interface Location {
  lat: number;
  lon: number;
  price: number;
}

class PackageController {
  static async createNewPackage(request: Request, response: Response) {
    //frontend data structure: formData.numOfGuests + formData.budget+drinkName + foodName + coordinates
    //location needs to be {  lat: number; lon: number;price: number;}
    const { coordinates, budget, numOfGuests, drink, food } = request.body;

    //form venue data to Location data format
    const venueLocations = await RespositoryHelper.venueRepo.find();

    //console.log(venueLocations);
    // console.log(request.body);
    const vennueData = venueLocations.map((venue) => {
      const lat = venue.location[0];
      const lon = venue.location[1];
      const price = venue.price;
      const venuename = venue.venuename;
      return {
        lat: lat,
        lon: lon,
        price: price,
        venuename: venuename,
      };
    });

    // console.log(vennueData);
    const venueBudge = parseInt(budget) * 0.6;

    //format coordinates with budget from req.body
    const reqCoordinatesData = {
      lat: coordinates[0],
      lon: coordinates[1],
      price: venueBudge,
      venuename: "",
    };
    // find the venue around 60% of budget and near location , maybe only return one option
    const nearbyLocations = findNearbyLocations(
      reqCoordinatesData,
      vennueData,
      500
    );

    const selectedVenue = getRandomElement(nearbyLocations);

    console.log(JSON.stringify(selectedVenue) + "!!!!!"); //tested
    //caculate a pack of drink for 10 people budget 10% and food budget 10% based on number of guests
    const drinkBudget = parseInt(budget) * 0.1;
    //return drink object drink{name, price }
    const drinkData = await RespositoryHelper.drinkRepo.find();
    // console.log(drinkData);
    //based on numOfGuest to caculate how many packs needed
    const numOfPacks = numOfGuests / 10;
    let selectedDrink : DrinkEntity[]=[];
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

        selectedDrink.push(randomDrink);
       
        
      }
    } else {
      const selectedDrinkData = drinkData.filter((d) => {
        return d.price <= drinkBudget && drink.includes(d.category);
      });
      selectedDrink = getRandomElement(selectedDrinkData);
      
    }

    console.log(">>>>" + JSON.stringify(selectedDrink) + "<<<<<");

    //change map to reduce function and solve when there's only one drink what will happen?
    if (selectedDrink.length > 0) {
      const arr = selectedDrink.map(s => s.price.toString());
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      drinkTotal +=parseFloat( arr[i]);
     }
    }
  
    console.log(drinkTotal);
  
    
    //food
    const foodBudget = parseInt(budget) * 0.1;
    const foodData = await RespositoryHelper.foodRepo
      .createQueryBuilder("entity")
      .where("entity.foodchoice IN (:...food)", { food })
      .andWhere("entity.price <= :price", { price: foodBudget })
      .getMany();

    let selectedFood: FoodEntity[] = [];
 let foodTotal = 0;
    for (let i = 0; i < numOfPacks; i++) {
      const randomIndex = Math.floor(Math.random() * foodData.length);
      const randomFood = foodData[randomIndex];

      selectedFood.push(randomFood);
      
    }
    console.log(">>>>" + JSON.stringify(selectedFood) + "SELECTED FOOD<<<<");
      const arrFood = selectedFood.map((s) => s.price.toString());
      
      for (let i = 0; i < arrFood.length; i++) {
        foodTotal += parseFloat(arrFood[i]);
      }
      console.log(foodTotal +">>>>>");

    
    //return a json with total price, venue info, drink items, food option
    const newPackage = {
      venueInfo: selectedVenue,
      drinkInfo: selectedDrink,
      foodInfo: selectedFood,
    };
    //const totalPrice = selectedVenue.price + drinkTotal + foodTotal;
    //console.log(totalPrice);
    //save info to db and return it to frontendd
  }

  static async fetchAllPackages(request: Request, response: Response) {
    try {
      const packages = await RespositoryHelper.packageListRepo.find();
      console.log(packages);
    } catch (error) {
      console.log(error);
    }
  }
  static async fetchPackagesByUser(request: Request, response: Response) {}
}

export default PackageController;
