import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcryptjs from 'bcryptjs'
import { GenericConfig } from 'src/pkg/config/generic.config'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { UserRepository } from 'src/pkg/entity/user/user.repository'
import { JwtPayload } from 'src/pkg/interface/jwt-payload.interface'
import { CreateSessionDto } from './dto/create-session.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(GenericConfig.KEY)
    private genericConfig: ConfigType<typeof GenericConfig>,
    private jwtService: JwtService,
  ) {}

  public async createSession(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    }

    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken,
    }
  }

  public async validateUser(dto: CreateSessionDto) {
    const user = await this.userRepository.findOne({
      username: dto.username,
    })
    if (!user) throw new UnauthorizedException('user_not_found')
    const isMatch = await bcryptjs.compare(dto.password, user.password)
    if (!isMatch)
      throw new UnauthorizedException('username_or_password_invalid')

    return user
  }

  public async me(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ id }).catch(() => {
      throw new NotFoundException('user_not_found')
    })
  }
}
