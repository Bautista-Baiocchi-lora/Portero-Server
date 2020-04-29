import { Module } from '@nestjs/common';
import MessageModule from 'src/message/message.module';
import SessionModule from 'src/session/session.module';
import LoteController from './lote.controller';
import LoteService from './lote.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [SessionModule, MessageModule],
})
export default class LoteModule {}
