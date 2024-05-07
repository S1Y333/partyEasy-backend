import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserEntity } from "../entities/user.entity";
import { VenueEntity } from "../entities/venue.entity";
import { DrinkEntity } from "../entities/drinks.entity";
import { FoodEntity } from "../entities/food.entity";
import { PartySuppliesEntity } from "../entities/partySupply.entity";
import { PackageListEntity } from "../entities/packageList.entity";
import { faker } from "@faker-js/faker";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // Run the factories here
    const userFactory = factoryManager.get(UserEntity);
    const users = await userFactory.saveMany(7);

    //venue
    const venueFactory = factoryManager.get(VenueEntity);
    const venues = await venueFactory.saveMany(7);

    //drinks
    const drinkFactory = factoryManager.get(DrinkEntity);
    const drinks = await drinkFactory.saveMany(7);

    //food
    const foodFactory = factoryManager.get(FoodEntity);
    const food = await foodFactory.saveMany(7);

    //partysupplies
    const partySuppliesFactory = factoryManager.get(PartySuppliesEntity);
    const partySupplies = await partySuppliesFactory.saveMany(7);

    //packagelists
    // const packageListFactory = factoryManager.get(PackageListEntity);
    // const packageList = await packageListFactory.saveMany(7);
    const packagesRepository = dataSource.getRepository(PackageListEntity);
    //   const usersRepository = dataSource.getRepository(UserEntity);

    //   const usersNew = await usersRepository.find();

    const packageListFactory = factoryManager.get(PackageListEntity);
    const packages = await Promise.all(
      Array(10)
        .fill("")
        .map(async () => {
          const made = await packageListFactory.make({
            creator: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await packagesRepository.save(packages);
  }
}
