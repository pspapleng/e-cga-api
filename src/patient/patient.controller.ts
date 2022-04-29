import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from 'src/pkg/decorator/user.decorator'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { CreatePatientDto } from './dto/create-patient.dto'
import { PatientService } from './patient.service'

@Controller('patient')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/')
  async createPatient(@Body() dto: CreatePatientDto, @User() user: UserEntity) {
    return this.patientService.createPatient(dto, user)
  }

  @Patch('/')
  async updatePatient(@Body() dto: CreatePatientDto, @User() user: UserEntity) {
    return this.patientService.createPatient(dto, user)
  }

  // @Post('/student')
  // async createAgentUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto)
  // }
}
