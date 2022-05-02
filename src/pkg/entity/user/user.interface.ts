import { IPatient } from '../patient/patient.interface'
import { IBase } from '../_base/base.interface'
export interface IUser extends IBase {
  username: string
  nurseId: string
  firstName: string
  lastName: string
  password: string
  patient: IPatient[]
}
