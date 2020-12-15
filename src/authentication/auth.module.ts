import { Module } from '@nestjs/common';
import AccountModule from 'src/account/account.module';
import AuthenticationController from './auth.controller';
import AuthenticationService from './auth.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [AccountModule],
})
export class AuthenticationModule {}
