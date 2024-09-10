import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from './response'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error=exception.getResponse()
    const status =error?400: exception.getStatus();
    console.log(exception,error)
    const responseToSend=sendResponse({error_code:status,
      error_message:error['message']||exception.message||exception,
      errors:error?error['error']:exception['response']},"")
      console.log("response",responseToSend)
    response
    .status(status)
    .send(responseToSend)
}
}