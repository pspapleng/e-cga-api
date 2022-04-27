import { IsEmail, IsString } from 'class-validator'

export class CreateSessionDto {
  @IsEmail()
  username: string

  @IsString()
  password: string
}
