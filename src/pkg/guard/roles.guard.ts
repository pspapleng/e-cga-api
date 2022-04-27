import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE_KEY } from '../decorator/role.decorator'
import { UserRole } from '../entity/user/user-role.enum'
import { UserEntity } from '../entity/user/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    const userRole = (user as UserEntity).role
    return requiredRoles.some((role) => userRole === role)
  }
}
