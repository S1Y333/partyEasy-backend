import {
  Column,
  Entity,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseTemplate } from "./base";
import { PackageListEntity } from "./packageList";

@Entity("venue")
export class VenueEntity extends BaseTemplate {
  @Column({ nullable: false })
  venuename: string;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  price: number; //DECIMAL type with a precision of 10 digits and a scale of 2 decimal places

  @Column('json',{ nullable: false })
  location: any;

  @OneToMany(() => PackageListEntity, (pack) => pack.venues)
  packages: PackageListEntity[];
}
