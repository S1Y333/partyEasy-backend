import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { PackageListEntity } from "../entities/packageList.entity";

export const PackageListFactory = setSeederFactory(
  PackageListEntity,
  (faker: Faker) => {
    const packageList = new PackageListEntity();
    packageList.likes = faker.number.int({ min: 10, max: 1000 }); // 57
    packageList.saves = faker.number.int({ min: 10, max: 1000 }); // 57
    packageList.price = parseFloat(
      faker.commerce.price({
        min: 200,
        max: 20000,
      })
    ); // $114

    return packageList;
  }
);
