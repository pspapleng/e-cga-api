import { UserRole } from '../entity/user/user-role.enum'

export interface JwtPayload {
  id: string
  email: string
  role: UserRole
}
