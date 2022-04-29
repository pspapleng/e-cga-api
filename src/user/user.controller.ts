import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  // @Post('/admin')
  // async createMasterUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto)
  // }

  // @Post('/student')
  // async createAgentUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto)
  // }
}
