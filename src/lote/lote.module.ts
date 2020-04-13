import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteModule } from 'src/invite/invite.module';
import SessionModule from 'src/session/session.module';
import LoteController from './lote.controller';
import Lote from './lote.entity';
import LoteService from './lote.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [SessionModule, TypeOrmModule.forFeature([Lote]), InviteModule],
})
export default class LoteModule {}
