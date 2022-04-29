import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PatientRepository } from 'src/pkg/entity/patient/patient.repository'
import { IResult } from 'src/pkg/entity/result/result.interface'
import { ResultRepository } from 'src/pkg/entity/result/result.repository'
import { CreateResultDto } from './dto/create-result.dto'
import { QueryResultDto } from './dto/query-result.dto'

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultRepository)
    private resultRepository: ResultRepository,
    @InjectRepository(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  async createOne(dto: CreateResultDto): Promise<IResult> {
    const patient = await this.patientRepository.findOneOrFail({
      id: dto.patientId,
    })

    const result = await this.resultRepository.create()
    result.patient = patient
    result.result = dto.result

    return await this.resultRepository.save(result)
  }

  async getPagination(query: QueryResultDto): Promise<IResult[]> {
    const patient = await this.patientRepository.findOneOrFail({
      id: query.patientId,
    })
    return await this.resultRepository.find({
      where: {
        patient: patient,
      },
      skip: query.skip,
      take: query.limit,
    })
  }
}
