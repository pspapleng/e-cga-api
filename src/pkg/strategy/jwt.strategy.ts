import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from 'jsonwebtoken'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'src/auth/auth.service'
import { GenericConfig } from '../config/generic.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(GenericConfig.KEY)
    private genericConfig: ConfigType<typeof GenericConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: genericConfig.secret,
    })
  }

  async validate(payload: JwtPayload) {
    const user = this.authService.me(payload.id)
    if (!user) throw new UnauthorizedException('user_invalid')
    return user
  }
}
