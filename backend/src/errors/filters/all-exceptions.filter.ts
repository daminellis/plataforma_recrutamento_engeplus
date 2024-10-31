import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomHttpException } from '../exceptions/custom-exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    let status: number;
    let message: any;

    if (exception instanceof CustomHttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    console.log(exception);
    
    response.status(status).send({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}