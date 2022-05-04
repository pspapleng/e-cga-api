import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AuthModule } from './auth/auth.module'
import { HealthController } from './health/health.controller'
import { PatientModule } from './patient/patient.module'
import { AdminInitConfig } from './pkg/config/admin-init.config'
import { DatabaseConfig } from './pkg/config/database.config'
import { GenericConfig } from './pkg/config/generic.config'
import { PatientEntity } from './pkg/entity/patient/patient.entity'
import { ResultEntity } from './pkg/entity/result/result.entity'
import { UserEntity } from './pkg/entity/user/user.entity'
import { ResultModule } from './result/result.module'
import { UserModule } from './user/user.module'

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
        entities: [UserEntity, PatientEntity, ResultEntity],
        synchronize: dbConfig.isSync,
        dropSchema:
          genericCofig.mode === 'production' ? false : dbConfig.isDrop,
        logging: dbConfig.isLog,
        namingStrategy: new SnakeNamingStrategy(),
        ...(dbConfig.isSSL && { ssl: { ca: dbConfig.caCert } }),
      }),
      inject: [DatabaseConfig.KEY, GenericConfig.KEY],
    }),
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
    PatientModule,
    ResultModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
