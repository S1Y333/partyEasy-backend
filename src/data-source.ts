import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();
const dbPort = +process.env.MYSQL_PORT ;

if (isNaN(dbPort)) {
  console.log(`Invalid DB PORT:-->${dbPort}`);
  process.exit(1);
}

const entityPath = path.join(__dirname + "/entities/**/*.entity{.ts,.js}");

const options: DataSourceOptions = {
  type: "mysql",
  host: process.env.MYSQL_PRIMARY_HOST,
  port: dbPort,
  username: process.env.MYSQL_PRIMARY_USERNAME,
  password: process.env.MYSQL_PRIMARY_PASSWORD,
  database: process.env.MYSQL_PRIMARY_DATABASE,
  logging: ["error"],
  entities: [entityPath],
  synchronize: false,
  subscribers: [],
  migrations: [],
  charset: "utf8",
};

const gDB = new DataSource(options);
export default gDB;