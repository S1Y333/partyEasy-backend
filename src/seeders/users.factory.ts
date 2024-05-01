import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { UserEntity } from "../entities/user.entity";

export const UserFactory = setSeederFactory(UserEntity, (faker: Faker) => {
  const user = new UserEntity();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();

  return user;
});
