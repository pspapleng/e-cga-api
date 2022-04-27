import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcryptjs from 'bcryptjs'
import { GenericConfig } from 'src/pkg/config/generic.config'
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

  public async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(
      dto.password,
      this.genericConfig.salt,
    )
    const user = this.userRepository.create()
    user.username = dto.username
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.password = hashedPassword

    await this.userRepository.save(user)
    return user
  }
}
