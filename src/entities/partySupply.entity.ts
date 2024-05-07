import {
  Column,
  Entity,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseTemplate } from "./base.entiy";

@Entity("partySupplies")
export class PartySuppliesEntity extends BaseTemplate {
  @Column({ nullable: false })
  supplyname: string;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  price: number; //DECIMAL type with a precision of 10 digits and a scale of 2 decimal places

  //maybe add from which website
}
