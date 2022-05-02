import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientRepository } from 'src/pkg/entity/patient/patient.repository'
import { ResultRepository } from 'src/pkg/entity/result/result.repository'
import { ResultController } from './result.controller'
import { ResultService } from './result.service'

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository, ResultRepository])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
