import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ResultEntity } from '../result/result.entity'
import { UserEntity } from '../user/user.entity'
import { BaseEntity } from '../_base/base.entity'
import { Gender } from './gender.enum'

@Entity({ name: 'patient' })
export class PatientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 10, unique: true })
  hn: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string

  @Column({ type: 'timestamptz' })
  dob: Date

  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @Column({ type: 'numeric' })
  height: number

  @Column({ type: 'numeric' })
  weight: number

  @Column({ type: 'numeric' })
  bmi: number

  @Column({ type: 'numeric' })
  waistline: number

  @Column({ type: 'numeric' })
  fallHistory: number

  @ManyToOne(() => UserEntity, (user) => user.patient)
  @JoinColumn()
  user: UserEntity

  @OneToMany(() => ResultEntity, (result) => result.patient)
  result: ResultEntity[]
}
