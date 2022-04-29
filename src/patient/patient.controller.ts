import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { User } from 'src/pkg/decorator/user.decorator'
import { UserEntity } from 'src/pkg/entity/user/user.entity'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
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

  @Patch('/:id')
  async updatePatient(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService.updatePatient(id, dto)
  }

  // @Post('/student')
  // async createAgentUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto)
  // }
}
