import { Module } from '@nestjs/common';
import { InviteModule } from 'src/invite/invite.module';
import SessionModule from 'src/session/session.module';
import LoteController from './lote.controller';
import LoteService from './lote.service';

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [SessionModule, InviteModule],
})
export default class LoteModule {}
