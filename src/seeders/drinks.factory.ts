import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { DrinkEntity } from "../entities/drinks.entity";

export const DrinkFactory = setSeederFactory(DrinkEntity, (faker: Faker) => {
  const drink = new DrinkEntity();
  drink.drinkname = faker.lorem.word();
  drink.category = faker.helpers.arrayElement(["non-alcohol", "alcohol"]);
  drink.price = parseFloat(
    faker.commerce.price({
      min: 10,
      max: 200,
    })
  );
  return drink;
});
