import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator'
import { GENDER } from 'src/pkg/entity/patient/gender.enum'
import { IPatient } from 'src/pkg/entity/patient/patient.interface'
import { IBase } from 'src/pkg/entity/_base/base.interface'

export type ICreatePatientDto = Omit<
  IPatient,
  keyof IBase | 'hn' | 'user' | 'result'
>

export class CreatePatientDto implements ICreatePatientDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsDate()
  @Type(() => Date)
  dob: Date

  @IsEnum(GENDER)
  gender: GENDER

  @IsNumber()
  height: number

  @IsNumber()
  weight: number

  @IsNumber()
  bmi: number

  @IsNumber()
  waistline: number

  @IsNumber()
  fallHistory: number
}
