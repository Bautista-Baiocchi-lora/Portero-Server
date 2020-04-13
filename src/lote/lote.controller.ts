import { Body, Controller, Delete, Get, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UserType } from 'src/authentication/user.type';
import { SignedInvite } from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { UserTypes } from 'src/session/session.guard';
import CreateLoteDTO from './create.lote.dto';
import LoteService from './lote.service';

@Controller('lote')
export default class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  @Post('new')
  async create(@Session() session: JwtSession, @Body() createDTO: CreateLoteDTO): Promise<boolean> {
    return await this.loteService.create(session.acc_id, createDTO);
  }

  @Get('invite')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  async invite(
    @Query('lote') lote_id: string,
    @Session() session: JwtSession,
  ): Promise<SignedInvite> {
    return await this.loteService.createInvite(lote_id, session.acc_id);
  }

  @Get('all')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  async getAllLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.loteService.getAll(session.acc_id);
  }

  @Delete('delete')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  async deleteLote(@Query('lote') lote_id: string, @Session() session: JwtSession) {
    return await this.loteService.delete(lote_id, session.acc_id);
  }

  @Post('associate')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.PROPIETARIO)
  async associatePropietario(
    @Query('lote') lote_id: string,
    @Query('barrio') barrio_id: string,
    @Query('device') device_id: string,
    @Session() session: JwtSession,
  ) {
    return await this.loteService.associatePropietario(lote_id, barrio_id, session, device_id);
  }
}
