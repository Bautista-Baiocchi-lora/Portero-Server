import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import MessageController from './message.controller';
import MessageService from './message.service';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [SessionModule],
  exports: [MessageService],
})
export default class MessageModule {}
