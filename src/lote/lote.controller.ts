import { Body, Controller, Delete, Get, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
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

  @Get('barrio/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async getBarrioLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.loteService.getAllLotesWithPropietariosByBarrio(session.acc_id);
  }

  @Get('propietario/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.USER)
  async getPropietarioLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.loteService.getAllLotesOfPropietario(session);
  }

  @Post('associate')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.USER)
  async associatePropietario(
    @Body() associateDTO: AssociatePropietarioDTO,
    @Session() session: JwtSession,
  ): Promise<boolean> {
    return await this.loteService.associatePropietario(associateDTO, session);
  }
}
