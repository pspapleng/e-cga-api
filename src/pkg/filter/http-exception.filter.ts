import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import * as statuses from 'statuses'
import { EntityNotFoundError } from 'typeorm'
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    if (exception instanceof HttpException) {
      response
        .status((exception as HttpException).getStatus())
        .json((exception as HttpException).getResponse())
    } else {
      const message = (exception as Error).message
      let status = HttpStatus.INTERNAL_SERVER_ERROR
      if (exception instanceof EntityNotFoundError) {
        status = HttpStatus.NOT_FOUND
      }
      response.status(status).json({
        statusCode: status,
        message: message,
        error: statuses(status),
      })
    }
  }
}
