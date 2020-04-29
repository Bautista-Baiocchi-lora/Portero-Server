import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageModule from 'src/message/message.module';
import SessionModule from 'src/session/session.module';
import BarrioController from './barrio.controller';
import Barrio from './barrio.entity';
import { BarrioService } from './barrio.service';

@Module({
  providers: [BarrioService],
  controllers: [BarrioController],
  imports: [TypeOrmModule.forFeature([Barrio]), MessageModule, SessionModule],
})
export default class BarrioModule {}
