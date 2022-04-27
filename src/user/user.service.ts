import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcryptjs from 'bcryptjs'
import { GenericConfig } from 'src/pkg/config/generic.config'
import { UserRole } from 'src/pkg/entity/user/user-role.enum'
import { UserRepository } from 'src/pkg/entity/user/user.repository'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(GenericConfig.KEY)
    private genericConfig: ConfigType<typeof GenericConfig>,
  ) {}

  public async createUser(dto: CreateUserDto, role: UserRole) {
    const hashedPassword = await bcryptjs.hash(
      dto.password,
      this.genericConfig.salt,
    )
    const user = this.userRepository.create()
    user.email = dto.email
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.password = hashedPassword
    user.role = role

    await this.userRepository.save(user)
    return user
  }
}
