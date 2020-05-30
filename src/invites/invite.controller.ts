import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
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
    return await this.inviteService.createInvite(session, inviteDTO);
  }
}
