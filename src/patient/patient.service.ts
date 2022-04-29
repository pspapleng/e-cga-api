import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PatientRepository } from 'src/pkg/entity/patient/patient.repository'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { CreatePatientDto } from './dto/create-patient.dto'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  public async createPatient(dto: CreatePatientDto, user: UserEntity) {
    const patient = this.patientRepository.create()
    patient.firstName = dto.firstName
    patient.lastName = dto.lastName
    patient.dob = dto.dob
    patient.gender = dto.gender
    patient.height = dto.height
    patient.weight = dto.weight
    patient.bmi = dto.bmi
    patient.waistline = dto.waistline
    patient.fallHistory = dto.fallHistory
    patient.user = user
    await this.patientRepository.save(patient)
    return patient
  }

  // public async updatePatient(dto: CreatePatientDto, user: UserEntity) {
  //   const patient = this.patientRepository.create()
  //   patient.firstName = dto.firstName
  //   patient.lastName = dto.lastName
  //   patient.dob = dto.dob
  //   patient.gender = dto.gender
  //   patient.height = dto.height
  //   patient.weight = dto.weight
  //   patient.bmi = dto.bmi
  //   patient.waistline = dto.waistline
  //   patient.fallHistory = dto.fallHistory
  //   patient.user = user
  //   await this.patientRepository.save(patient)
  //   return patient
  // }

  // public async getAllPatients() {
  //   return this.patientRepository.find()
  // }
}
