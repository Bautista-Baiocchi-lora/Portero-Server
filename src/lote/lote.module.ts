import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import LoteController from './lote.controller';
import LoteService from './lote.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [SessionModule],
})
export default class LoteModule {}
