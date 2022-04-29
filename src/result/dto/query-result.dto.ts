import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsUUID } from 'class-validator'

export class QueryResultDto {
  @IsUUID()
  patientId: string

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  skip?: number

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 50
}
