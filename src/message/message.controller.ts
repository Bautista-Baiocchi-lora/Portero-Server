import { Controller, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import MessageService, { SignedMessage } from './message.service';

@Controller('message')
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('prop/to/lote')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async associateNewPropietario(
    @Query('lote') lote_id: string,
    @Session() session: JwtSession,
  ): Promise<SignedMessage> {
    return await this.messageService.createPropietarioInvite(lote_id, session);
  }

  @Post('guardia/to/barrio')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async associateNewGuardia(@Session() session: JwtSession): Promise<SignedMessage> {
    return await this.messageService.createGuardiaInvite(session);
  }
}
