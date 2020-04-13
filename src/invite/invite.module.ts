import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import InviteController from './invite.controller';
import InviteService from './invite.service';

@Module({
  providers: [InviteService],
  controllers: [InviteController],
  imports: [SessionModule],
  exports: [InviteService],
})
export class InviteModule {}
