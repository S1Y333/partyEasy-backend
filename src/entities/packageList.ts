import {
  Column,
  Entity,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { BaseTemplate } from "./base";
import { UserEntity } from "./user";
import { VenueEntity } from "./venue";
import { DrinkEntity } from "./drinks";
import { FoodEntity } from "./food";

@Entity("packageList")
export class PackageListEntity extends BaseTemplate {
  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  price: number; //DECIMAL type with a precision of 10 digits and a scale of 2 decimal places

  @ManyToOne(() => UserEntity, (user) => user.packages)
  creator: UserEntity;

  @ManyToOne(() => VenueEntity, (venue) => venue.packages)
  venues: VenueEntity;

  @ManyToMany(() => DrinkEntity, (drink) => drink.packages)
  @JoinTable()
  drinks: DrinkEntity;

  @ManyToMany(() => FoodEntity, (food) => food.packages)
  @JoinTable()
  foods: FoodEntity;

  @Column({ nullable: true, default: 0 })
  likes: number;

  @Column({ nullable: true, default: 0 })
  saves: number;
}
