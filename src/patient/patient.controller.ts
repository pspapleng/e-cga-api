import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from 'src/pkg/decorator/user.decorator'
import { IPatient } from 'src/pkg/entity/patient/patient.interface'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { HttpExceptionFilter } from 'src/pkg/filter/http-exception.filter'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { CreatePatientDto } from './dto/create-patient.dto'
import { QueryPatientDto } from './dto/query-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientService } from './patient.service'
@Controller('patient')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/')
  async createOne(
    @Body() dto: CreatePatientDto,
    @User() user: UserEntity,
  ): Promise<IPatient> {
    return this.patientService.createOne(dto, user)
  }

  @Get('/')
  async getPagination(@Query() query: QueryPatientDto): Promise<IPatient[]> {
    return this.patientService.getPagination(query)
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.patientService.getById(id)
  }

  @Patch('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
  ): Promise<IPatient> {
    return this.patientService.updateById(id, dto)
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    return this.patientService.deleteById(id)
  }
}
