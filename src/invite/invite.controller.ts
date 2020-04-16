import { Controller, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UserType } from 'src/authentication/user.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { UserTypes } from 'src/session/session.guard';
import InviteService, { SignedInvite } from './invite.service';

@Controller('invite')
export default class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('prop/to/lote')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  async newLoteInvite(
    @Query('lote') lote_id: string,
    @Session() session: JwtSession,
  ): Promise<SignedInvite> {
    return await this.inviteService.createLoteInvite(lote_id, session.acc_id);
  }
}
