import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  async createMasterUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @Post('/student')
  async createAgentUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }
}
