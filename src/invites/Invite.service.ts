import { Injectable } from '@nestjs/common';
import MessageService, { SignedMessage } from 'src/message/message.service';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { AuthenticatedGuestsDTO } from './authenticated.guests.dto';
import { InviteCreationDTO } from './invite.creation.dto';
import * as query from './invite.queries';

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
      .query(query.insert_invite(session.acc_id, session.dev_id, inviteDTO, 60 * 60 * 60))
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
      this.connection.query(query.select_invite_as_guardia(session.session_id, inviteId)),
      this.connection.query(query.get_invite_guest_list_as_guardia(session.session_id, inviteId)),
    ])
      .then(values => {
        return {
          info: values[0][0],
          guests: values[1],
        };
      })
      .catch(error => console.log(error));
  }

  async authenticateGuests(session: JwtSession, response: AuthenticatedGuestsDTO): Promise<any> {
    return Promise.all([
      this.connection.query(
        query.insert_guests_entered(session.acc_id, session.dev_id, response.approved),
      ),
      this.connection.query(
        query.insert_guests_rejected(session.acc_id, session.dev_id, response.approved),
      ),
    ]).catch(error => console.log(error));
  }
}
