import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseTemplate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ select: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
