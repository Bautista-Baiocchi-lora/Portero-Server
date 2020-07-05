import { Injectable } from '@nestjs/common';
import MessageService, { SignedMessage } from 'src/message/message.service';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { InviteCreationDTO } from './invite.creation.dto';

type DecodedInvite = {
  type: number;
  invite_id: string;
  iat: number;
};

@Injectable()
export default class InviteService {
  constructor(
    private readonly messageService: MessageService,
    private readonly connection: Connection,
  ) {}

  async create(session: JwtSession, inviteDTO: InviteCreationDTO): Promise<SignedMessage> {
    return this.connection
      .query(insert_invite(session.acc_id, session.dev_id, inviteDTO, 60 * 60))
      .then(response => response[0].insert_invite)
      .then(id => this.messageService.createGuestInvite(id));
  }

  async validate(session: JwtSession, signedInvite: SignedMessage): Promise<any> {
    const invite: DecodedInvite = await this.messageService.decode(
      signedInvite.message,
      signedInvite.id,
    );

    return this.getFullInviteAsGuardia(session, invite.invite_id);
  }

  async getFullInviteAsGuardia(session: JwtSession, inviteId: string): Promise<any> {
    return Promise.all([
      this.connection.query(select_invite_as_guardia(session.session_id, inviteId)),
      this.connection.query(get_invite_guest_list_as_guardia(session.session_id, inviteId)),
    ])
      .then(values => {
        return {
          info: values[0][0],
          guests: values[1],
        };
      })
      .catch(error => console.log(error));
  }

  async allowVisita(session: JwtSession, inviteId: string): Promise<boolean> {
    return this.connection
      .query(allow_visita(inviteId, session.session_id))
      .then(response => response[0])
      .catch(error => console.log(error));
  }
}

const get_invite_guest_list_as_guardia = (session_id: string, invite_id: string) => {
  return `SELECT * FROM get_invite_guest_list('${invite_id}');`;
};

const select_invite_as_guardia = (session_id: string, invite_id: string) => {
  return `SELECT * FROM select_invite_as_guardia('${invite_id}', '${session_id}');`;
};

function validate_invite(invite_id: string, session_id: string): string {
  return `SELECT * FROM validate_invite('${invite_id}', '${session_id}');`;
}

function insert_invite(
  acc_id: string,
  dev_id: string,
  inviteDTO: InviteCreationDTO,
  secsTillExp: number,
): string {
  return `SELECT * FROM insert_invite('${acc_id}', '${dev_id}', '${inviteDTO.doc_id}', '${inviteDTO.first_name}', '${inviteDTO.last_name}', '${inviteDTO.lote_id}', '${secsTillExp}');`;
}

function allow_visita(invite_id: string, session_id: string): string {
  return `SELECT * FROM allow_visita('${invite_id}', '${session_id}');`;
}
