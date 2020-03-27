import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedExceptionFilter } from './query-failed.exception.filter';
import { JwtExceptionFilter } from './authentication/jwt.exception.filter';
import { userInfo } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new QueryFailedExceptionFilter())
  app.useGlobalFilters(new JwtExceptionFilter())
  await app.listen(3500);
}
bootstrap();
