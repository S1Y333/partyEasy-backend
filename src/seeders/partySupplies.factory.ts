import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { PartySuppliesEntity } from "../entities/partySupply.entity";

export const PartySuppliesFactory = setSeederFactory(
  PartySuppliesEntity,
  (faker: Faker) => {
    const partySupplies = new PartySuppliesEntity();
    partySupplies.supplyname = faker.location.street();
    partySupplies.price = parseFloat(
      faker.commerce.price({
        min: 500,
        max: 10000,
      })
    ); // $114

    return partySupplies;
  }
);
