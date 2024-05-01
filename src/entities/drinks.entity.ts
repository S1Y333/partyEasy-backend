import {
  Column,
  Entity,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseTemplate } from "./base.entiy";
import { PackageListEntity } from "./packageList.entity";

@Entity("drinks")
export class DrinkEntity extends BaseTemplate {
  @Column({ nullable: false })
  drinkname: string;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  price: number; //DECIMAL type with a precision of 10 digits and a scale of 2 decimal places

  @Column({ nullable: false })
  category: "alcohol" | "non-alcohol"; //

  @ManyToMany(() => PackageListEntity, (pack) => pack.drinks)
  packages: PackageListEntity;
}
