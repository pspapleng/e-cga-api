import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { IResult } from 'src/pkg/entity/result/result.interface'
import { HttpExceptionFilter } from 'src/pkg/filter/http-exception.filter'
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard'
import { CreateResultDto } from './dto/create-result.dto'
import { ResultService } from './result.service'

@Controller('result')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('/')
  async createOne(@Body() dto: CreateResultDto): Promise<IResult> {
    return this.resultService.createOne(dto)
  }
}
