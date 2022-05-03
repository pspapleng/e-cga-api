import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'
import { IFormResult } from 'src/pkg/entity/result/form-result.interface'
import { IResult } from 'src/pkg/entity/result/result.interface'
import { IBase } from 'src/pkg/entity/_base/base.interface'

export interface ICreateResultDto
  extends Omit<IResult, keyof IBase | 'patient'> {
  patientId: string
}

class ResultFormDto implements IFormResult {
  @IsString()
  MNA: string

  @IsString()
  OCA: string

  @IsString()
  FallRisk: string

  @IsString()
  TUGT: string

  @IsString()
  EYES: string

  @IsString()
  KNEE: string

  @IsString()
  OSTA: string
}

export class CreateResultDto implements ICreateResultDto {
  @ValidateNested()
  @Type(() => ResultFormDto)
  result: ResultFormDto

  @IsString()
  patientId: string
}
