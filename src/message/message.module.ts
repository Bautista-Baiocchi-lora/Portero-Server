import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import MessageController from './message.controller';
import InviteService from './message.service';

@Module({
  providers: [InviteService],
  controllers: [MessageController],
  imports: [SessionModule],
  exports: [InviteService],
})
export default class MessageModule {}
