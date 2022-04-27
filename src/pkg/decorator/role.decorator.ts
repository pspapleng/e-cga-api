import { SetMetadata } from '@nestjs/common'
import { UserRole } from '../entity/user/user-role.enum'

export const ROLE_KEY = 'role'
export const Roles = (...role: UserRole[]) => SetMetadata(ROLE_KEY, role)
