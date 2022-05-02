import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { PatientEntity } from '../patient/patient.entity'
import { BaseEntity } from '../_base/base.entity'
import { IFormResult } from './form-result.interface'

@Entity({ name: 'result' })
export class ResultEntity extends BaseEntity {
  @Column({ type: 'jsonb' })
  result: IFormResult

  @ManyToOne(() => PatientEntity, (patient) => patient.result)
  @JoinColumn()
  patient: PatientEntity
}
