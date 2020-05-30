import { Injectable } from '@nestjs/common';
import MessageService, { SignedMessage } from 'src/message/message.service';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { InviteCreationDTO } from './invite.creation.dto';
@Injectable()
export default class InviteService {
  constructor(
    private readonly messageService: MessageService,
    private readonly connection: Connection,
  ) {}

  async createInvite(session: JwtSession, inviteDTO: InviteCreationDTO): Promise<SignedMessage> {
    return await this.connection
      .query(insert_invite(session.acc_id, session.dev_id, inviteDTO))
      .then(response => response[0].insert_invite)
      .then(id => this.messageService.createGuestInvite(id));
  }
}

function insert_invite(acc_id: string, dev_id: string, inviteDTO: InviteCreationDTO): string {
  return `SELECT * FROM insert_invite('${acc_id}', '${dev_id}', '${inviteDTO.doc_id}', '${inviteDTO.first_name}', '${inviteDTO.last_name}', '${inviteDTO.lote_id}');`;
}
