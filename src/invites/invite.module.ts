import { Module } from '@nestjs/common';
import MessageModule from 'src/message/message.module';
import SessionModule from 'src/session/session.module';
import InviteController from './invite.controller';
import InviteService from './Invite.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService],
  imports: [MessageModule, SessionModule],
})
export default class InviteModule {}
