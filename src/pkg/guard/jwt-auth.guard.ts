import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JsonWebTokenError } from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user, info: JsonWebTokenError) {
    if (info) {
      const { message } = info
      if (message === 'No auth token') throw new UnauthorizedException(message)
      throw new ForbiddenException(message)
    }
    if (err || !user) {
      throw err || new UnauthorizedException('user_not_found')
    }
    return user
  }
}
