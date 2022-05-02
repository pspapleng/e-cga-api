import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ResultEntity } from '../result/result.entity'
import { UserEntity } from '../user/user.entity'
import { BaseEntity } from '../_base/base.entity'
import { GENDER } from './gender.enum'

@Entity({ name: 'patient' })
export class PatientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  hn: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string

  @Column({ type: 'timestamptz' })
  dob: Date

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER

  @Column({ type: 'int', nullable: true })
  height: number

  @Column({ type: 'int' })
  weight: number

  @Column({ type: 'int' })
  bmi: number

  @Column({ type: 'int' })
  waistline: number

  @Column({ type: 'int' })
  fallHistory: number

  @ManyToOne(() => UserEntity, (user) => user.patient)
  @JoinColumn()
  user: UserEntity

  @OneToMany(() => ResultEntity, (result) => result.patient)
  result: ResultEntity[]
}
