import { BaseTemplate } from "./base.entiy";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { PackageListEntity } from "./packageList.entity";

enum FoodOptions {
  PIZZA = "pizza",
  SUSHI = "sushi",
  MEXICO = "mexico",
  CHICKEN = "chicken",
}

@Entity("food")
export class FoodEntity extends BaseTemplate {
  @Column({ nullable: false })
  foodname: string;

  @Column({ type: "enum", enum: FoodOptions, default: FoodOptions.PIZZA })
  foodchoice: FoodOptions;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => PackageListEntity, (pack) => pack.foods)
  packages: PackageListEntity[];
  //maybe add restaurant name & location later
}
