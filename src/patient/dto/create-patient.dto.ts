import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator'
import { Gender } from 'src/pkg/entity/patient/gender.enum'

export class CreatePatientDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsDate()
  @Type(() => Date)
  dob: Date

  @IsEnum(Gender)
  gender: Gender

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
