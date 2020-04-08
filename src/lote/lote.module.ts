import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionModule from 'src/session/session.module';
import LoteController from './lote.controller';
import Lote from './lote.entity';
import LoteService from './lote.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [SessionModule, TypeOrmModule.forFeature([Lote])],
})
export default class LoteModule {}
