import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { VenueEntity } from "../entities/venue.entity";

export const VenueFactory = setSeederFactory(VenueEntity, (faker: Faker) => {
  const venue = new VenueEntity();
  venue.venuename = faker.location.street();
  venue.numOfPeople = faker.number.int(100);
  venue.price = parseFloat(
    faker.commerce.price({
      min: 500,
      max: 10000,
    })
  ); // $114
  venue.location = faker.location.nearbyGPSCoordinate();
  return venue;
});
