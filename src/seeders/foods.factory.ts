import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { FoodEntity } from "../entities/food.entity";

enum FoodOptions {
  PIZZA = "pizza",
  SUSHI = "sushi",
  MEXICO = "mexico",
  CHICKEN = "chicken",
}

export const FoodFactory = setSeederFactory(FoodEntity, (faker: Faker) => {
  const food = new FoodEntity();
  food.foodname = faker.lorem.word();
  food.foodchoice = faker.helpers.enumValue(FoodOptions);
  food.price = parseFloat(
    faker.commerce.price({
      min: 200,
      max: 1000,
    })
  );
  return food;
});
