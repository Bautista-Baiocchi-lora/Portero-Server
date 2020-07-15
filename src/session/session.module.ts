import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService, JwtService],
  exports: [SessionService, JwtService],
})
export default class SessionModule {}
