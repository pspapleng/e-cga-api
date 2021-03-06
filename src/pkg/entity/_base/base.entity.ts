import { Exclude } from 'class-transformer'
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IBase } from './base.interface'

export abstract class BaseEntity implements IBase {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt!: Date

  @Exclude()
  @UpdateDateColumn()
  updatedAt!: Date

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date
}
