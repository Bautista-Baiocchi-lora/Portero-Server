import { Module } from '@nestjs/common';
import BarrioController from './barrio.controller';
import BarrioService from './barrio.service';

@Module({
  imports: [],
  controllers: [BarrioController],
  providers: [BarrioService],
})
export class BarrioModule {}
