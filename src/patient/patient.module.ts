import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientRepository } from 'src/pkg/entity/patient/patient.repository'
import { PatientController } from './patient.controller'
import { PatientService } from './patient.service'

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
