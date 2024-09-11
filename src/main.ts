import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/ExceptionHandler';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'
import * as bodyParser from 'body-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  await app.listen(5000);
}
bootstrap();
