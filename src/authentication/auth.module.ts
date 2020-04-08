import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  imports: [SessionModule],
})
export class AuthenticationModule {}
