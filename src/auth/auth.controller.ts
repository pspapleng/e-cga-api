import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from 'src/pkg/decorator/user.decorator'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { LocalAuthGuard } from 'src/pkg/guard/local-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  async createSession(@User() user: UserEntity) {
    return this.authService.createSession(user)
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: UserEntity) {
    return user
  }
}
