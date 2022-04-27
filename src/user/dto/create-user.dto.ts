import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  username: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @MinLength(8)
  password: string
}
