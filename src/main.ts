import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedExceptionFilter } from './query-failed.exception.filter';
import { JwtExceptionFilter } from './authentication/jwt.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new QueryFailedExceptionFilter())
  app.useGlobalFilters(new JwtExceptionFilter())
  await app.listen(3000);
}
bootstrap();
