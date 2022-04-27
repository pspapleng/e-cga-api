import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Roles } from 'src/pkg/decorator/role.decorator'
import { UserRole } from 'src/pkg/entity/user/user-role.enum'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { RolesGuard } from 'src/pkg/guard/roles.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  @Roles(UserRole.Admin)
  async createMasterUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto, UserRole.Admin)
  }

  @Post('/student')
  @Roles(UserRole.Admin)
  async createAgentUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto, UserRole.Student)
  }
}
