import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { UserEntity } from "../entities/user";
import { VenueEntity } from "../entities/venue";
import { PackageListEntity } from "../entities/packageList";
import { DrinkEntity } from "../entities/drinks";
import { FoodEntity } from "../entities/food";
import { PartySuppliesEntity } from "../entities/partySupply";
import { UserFactory } from "./users.factory";
import { VenueFactory } from "./venues.factory";
import { DrinkFactory } from "./drinks.factory";
import { FoodFactory } from "./foods.factory";
import { PartySuppliesFactory } from './partySupplies.factory'
import { PackageListFactory } from "./packageList.factory";
import MainSeeder from "./main.seeder";
import * as path from "path";
import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_PRIMARY_HOST,
  MYSQL_PRIMARY_USERNAME,
  MYSQL_PRIMARY_PASSWORD,
  MYSQL_PRIMARY_DATABASE,
  MYSQL_HOST,
    MYSQL_PORT,
  
} = process.env;
const entityPath = path.join(__dirname + "/entities/*.ts");
const dbPort = +process.env.MYSQL_PORT;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: MYSQL_PRIMARY_HOST || "localhost",
  port: dbPort || 3306,
  username: MYSQL_PRIMARY_USERNAME,
  password: MYSQL_PRIMARY_PASSWORD,
  database: MYSQL_PRIMARY_DATABASE,
  entities: [
    UserEntity,
    VenueEntity,
    PackageListEntity,
    DrinkEntity,
    FoodEntity,
    PartySuppliesEntity,
  ],
  // additional config options brought by typeorm-extension
  factories: [
    UserFactory,
    VenueFactory,
    DrinkFactory,
    FoodFactory,
    PartySuppliesFactory,
    PackageListFactory,
  ],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
