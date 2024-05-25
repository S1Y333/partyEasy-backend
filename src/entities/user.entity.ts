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
  profilephotolink: string;

  @OneToMany(() => PackageListEntity, (pack) => pack.creator)
  packages: PackageListEntity[];

  @Column("json", { nullable: true, default: null })
  likesPackages: any | null = null;

  @Column("json", { nullable: true, default: null })
  savesPackages: any | null = null;
}
