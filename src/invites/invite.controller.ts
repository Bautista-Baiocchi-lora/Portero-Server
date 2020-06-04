import { Body, Controller, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { InviteCreationDTO } from 'src/invites/invite.creation.dto';
import { SignedMessage } from 'src/message/message.service';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import InviteService from './Invite.service';

@Controller('invite')
export default class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('create')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.USER)
  async createInvite(
    @Session() session: JwtSession,
    @Body() inviteDTO: InviteCreationDTO,
  ): Promise<SignedMessage> {
    return await this.inviteService.create(session, inviteDTO);
  }

  @Post('validate')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.GUARDIA)
  async validateInvite(@Session() session: JwtSession, @Body() signedInvite: SignedMessage) {
    return await this.inviteService.validate(session, signedInvite);
  }

  @Post('allow')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.GUARDIA)
  async allowVisita(
    @Session() session: JwtSession,
    @Query('id') inviteId: string,
  ): Promise<boolean> {
    return await this.inviteService.allowVisita(session, inviteId);
  }
}
