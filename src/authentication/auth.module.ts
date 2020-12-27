import { Module } from '@nestjs/common';
import AuthenticationController from './auth.controller';
import AuthenticationService from './auth.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [],
})
export class AuthenticationModule {}
