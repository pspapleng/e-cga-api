import { IResult } from '../result/result.interface'
import { IUser } from '../user/user.interface'
import { IBase } from '../_base/base.interface'
import { GENDER } from './gender.enum'

export interface IPatient extends IBase {
  hn: string
  firstName: string
  lastName: string
  dob: Date
  gender: GENDER
  height: number
  weight: number
  bmi: number
  waistline: number
  fallHistory: number
  user: IUser
  result: IResult[]
}
