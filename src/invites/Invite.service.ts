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

  async create(session: JwtSession, inviteDTO: InviteCreationDTO): Promise<SignedMessage> {
    return this.connection
      .query(insert_invite(session.acc_id, session.dev_id, inviteDTO))
      .then(response => response[0].insert_invite)
      .then(id => this.messageService.createGuestInvite(id));
  }

  async validate(session: JwtSession, signedInvite: SignedMessage) {
    const invite: Invite = await this.messageService.decode(signedInvite.message, signedInvite.id);
    return this.connection
      .query(validate_invite(invite.invite_id, session.acc_id, session.dev_id))
      .then(response => response[0])
      .catch(error => console.log(error));
  }

  async allowVisita(session: JwtSession, inviteId: string) {}
}

type Invite = {
  type: number;
  invite_id: string;
  iat: number;
};

function validate_invite(invite_id: string, acc_id: string, dev_id: string): string {
  return `SELECT * FROM validate_invite('${invite_id}', '${acc_id}', '${dev_id}');`;
}

function insert_invite(acc_id: string, dev_id: string, inviteDTO: InviteCreationDTO): string {
  return `SELECT * FROM insert_invite('${acc_id}', '${dev_id}', '${inviteDTO.doc_id}', '${inviteDTO.first_name}', '${inviteDTO.last_name}', '${inviteDTO.lote_id}');`;
}
