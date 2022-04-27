import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenericConfig } from 'src/pkg/config/generic.config'
import { UserRepository } from 'src/pkg/entity/user/user.repository'
import { JwtStrategy } from 'src/pkg/strategy/jwt.strategy'
import { LocalStrategy } from 'src/pkg/strategy/local.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (genericConfig: ConfigType<typeof GenericConfig>) => ({
        signOptions: {
          expiresIn: '30d',
        },
        secret: genericConfig.secret,
      }),
      inject: [GenericConfig.KEY],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
