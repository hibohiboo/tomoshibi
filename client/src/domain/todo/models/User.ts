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
  @PrimaryColumn({ type: 'text' })
  public id!: string

  @Column({ type: 'text' })
  public name!: string

  @CreateDateColumn()
  public readonly createdAt!: Date

  @UpdateDateColumn()
  public readonly updatedAt!: Date
}
