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

@Entity("user")
@Unique(["email"])
export class UserEntity extends BaseTemplate {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true, default: null })
  username: string;
  @Column({ nullable: true, default: null })
  profilelink: string;

  @OneToMany(() => PackageListEntity, (pack) => pack.creator)
  packages: PackageListEntity[];
}
