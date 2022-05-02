import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class QueryPatientDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  skip?: number

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 50
}
