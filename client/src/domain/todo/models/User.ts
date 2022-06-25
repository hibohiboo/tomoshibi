/* eslint-disable unused-imports/no-unused-vars */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm/browser'

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('text')
  public id!: string

  @Column()
  public name!: string

  @CreateDateColumn()
  public readonly createdAt!: Date

  @UpdateDateColumn()
  public readonly updatedAt!: Date
}
