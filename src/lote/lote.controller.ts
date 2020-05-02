import { Body, Controller, Delete, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import CreateLoteDTO from './create.lote.dto';
import LoteService, { Lote } from './lote.service';

@Controller('lote')
export default class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  @Post('new')
  async create(@Session() session: JwtSession, @Body() createDTO: CreateLoteDTO): Promise<Lote> {
    return await this.loteService.create(session.acc_id, createDTO);
  }

  @Delete('delete')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async deleteLote(
    @Session() session: JwtSession,
    @Query('lote') lote_id: string,
  ): Promise<string> {
    return await this.loteService.delete(lote_id, session.acc_id);
  }
}
