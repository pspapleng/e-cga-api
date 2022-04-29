import { IPatient } from '../patient/patient.interface'
import { IBase } from '../_base/base.interface'
import { IFormResult } from './form-result.interface'

export interface IResult extends IBase {
  result: IFormResult
  patient: IPatient
}
