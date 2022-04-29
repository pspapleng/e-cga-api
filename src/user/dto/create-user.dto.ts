import { IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username: string

  @IsString()
  nurseId: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @MinLength(8)
  password: string
}
