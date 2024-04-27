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

@Entity("user")
export class UserEntity extends BaseTemplate {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @OneToMany(() => PackageListEntity, (pack) => pack.creator)
  packages: PackageListEntity[];
}
