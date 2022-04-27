import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../_base/base.entity'
import { UserRole } from './user-role.enum'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'text' })
  password: string

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole
}
