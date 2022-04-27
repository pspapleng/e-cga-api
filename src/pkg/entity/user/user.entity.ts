import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'
import { PatientEntity } from '../patient/patient.entity'
import { BaseEntity } from '../_base/base.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string

  @Column({ type: 'varchar', length: 15, unique: true })
  nurseId: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'text' })
  password: string

  @OneToMany(() => PatientEntity, (patient) => patient.user)
  patient: PatientEntity[]
}
