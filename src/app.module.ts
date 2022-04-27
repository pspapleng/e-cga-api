import { Inject, Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule, PinoLogger } from 'nestjs-pino'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AuthModule } from './auth/auth.module'
import { HealthController } from './health/health.controller'
import { AdminInitConfig } from './pkg/config/admin-init.config'
import { DatabaseConfig } from './pkg/config/database.config'
import { GenericConfig } from './pkg/config/generic.config'
import { UserRole } from './pkg/entity/user/user-role.enum'
import { UserEntity } from './pkg/entity/user/user.entity'
import { UserRepository } from './pkg/entity/user/user.repository'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfig, GenericConfig, AdminInitConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        dbConfig: ConfigType<typeof DatabaseConfig>,
        genericCofig: ConfigType<typeof GenericConfig>,
      ) => ({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        autoLoadEntities: true,
        entities: [UserEntity],
        synchronize: dbConfig.isSync,
        dropSchema:
          genericCofig.mode === 'production' ? false : dbConfig.isDrop,
        logging: dbConfig.isLog,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [DatabaseConfig.KEY, GenericConfig.KEY],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-http-print',
          options: {
            destination: 1,
            all: true,
            colorize: true,
            translateTime: true,
            prettyOptions: {
              ignore: 'hostname,pid,context,req,res',
              messageFormat: '({context})  \x1B[37m{msg}',
            },
          },
        },
      },
    }),
    TerminusModule,
    AuthModule,
    UserModule,
  ],
  controllers: [HealthController],
  providers: [UserService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private userService: UserService,
    private readonly logger: PinoLogger,
    // @Inject(AdminInitConfig.KEY)
    // private AdminInitConfig: ConfigType<typeof AdminInitConfig>
    @Inject(AdminInitConfig.KEY)
    private adminInitConfig: ConfigType<typeof AdminInitConfig>,
  ) {
    logger.setContext(AppModule.name)
  }

  async onModuleInit() {
    // logic ชั่วคราวสำหรับการสร้าง owner user
    // ตั้งใจว่าเมื่อเข้าใช้งานครั้งแรกค่อยบังคับเปลี่ยน
    await this.userService
      .createUser(
        {
          email: this.adminInitConfig.username,
          firstName: 'admin',
          lastName: 'admin',
          password: this.adminInitConfig.password,
        },
        UserRole.Admin,
      )
      .then((user) => {
        this.logger.debug(user)
      })
      .catch((error) => {
        this.logger.info(error.message)
        return undefined
      })
  }
}
