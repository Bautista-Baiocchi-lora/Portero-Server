import { Module } from '@nestjs/common';
import MessageModule from 'src/message/message.module';
import SessionModule from 'src/session/session.module';
import GuardiaController from './guardia.controller';
import GuardiaService from './guardia.service';

@Module({
  controllers: [GuardiaController],
  providers: [GuardiaService],
  imports: [SessionModule, MessageModule],
})
export default class GuardiaModule {}
