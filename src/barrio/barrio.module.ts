import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import BarrioController from './barrio.controller';
import { BarrioService } from './barrio.service';

@Module({
  providers: [BarrioService],
  controllers: [BarrioController],
  imports: [SessionModule],
})
export default class BarrioModule {}
