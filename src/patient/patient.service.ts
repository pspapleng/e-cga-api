import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPatient } from 'src/pkg/entity/patient/patient.interface'
import { PatientRepository } from 'src/pkg/entity/patient/patient.repository'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  public async createPatient(
    dto: CreatePatientDto,
    user: UserEntity,
  ): Promise<IPatient> {
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
    const result = await this.patientRepository.save(patient)
    return result
  }

  public async updatePatient(
    id: string,
    dto: UpdatePatientDto,
  ): Promise<IPatient> {
    let patient = await this.patientRepository
      .findOneOrFail({ id })
      .catch(({ message }) => {
        throw new NotFoundException(message)
      })

    console.log(patient)
    patient = { ...patient, ...dto }

    const result = await this.patientRepository
      .save(patient)
      .catch(({ message }) => {
        throw new InternalServerErrorException(message)
      })

    return result
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
