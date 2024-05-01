import { UserEntity } from "../entities/user.entity";
import gDB from "../data-source";
import { VenueEntity } from "../entities/venue.entity";
import { FoodEntity } from "../entities/food.entity";
import {DrinkEntity} from "../entities/drinks.entity"
import { PackageListEntity } from "../entities/packageList.entity";

class RespositoryHelper {
  static get userRepo() {
    return gDB.getRepository(UserEntity);
  }

  static get venueRepo() {
    return gDB.getRepository(VenueEntity);
  }

  static get drinkRepo() {
    return gDB.getRepository(DrinkEntity);
  }

    static get foodRepo() {
        return gDB.getRepository(FoodEntity);
    }
 static get packageListRepo() {

     return gDB.getRepository(PackageListEntity);
 }
}

export default RespositoryHelper;
