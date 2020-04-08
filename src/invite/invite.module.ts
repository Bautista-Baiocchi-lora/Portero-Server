import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionModule from 'src/session/session.module';
import BarrioInvite from './barrio.invite.entity';
import InviteController from './invite.controller';
import InviteService from './invite.service';

@Module({
  providers: [InviteService],
  controllers: [InviteController],
  imports: [TypeOrmModule.forFeature([BarrioInvite]), SessionModule],
  exports: [InviteService],
})
export class InviteModule {}
