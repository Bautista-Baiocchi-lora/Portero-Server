import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InviteType } from './invite.type';

const jwt = require('jsonwebtoken');

@Injectable()
export default class InviteService {
  constructor(private readonly connection: Connection) {}

  private async sign(invite: any): Promise<SignedInvite> {
    const registration = await this.connection
      .query(register_invite_query())
      .then(response => response[0]);
    const token = await jwt.sign(invite, registration.encry_key);
    return {
      invite: token,
      id: registration.invite_id,
    };
  }

  async createLoteInvite(lote_id: string, barrio_id: string) {
    return await this.sign(loteInvite(lote_id, barrio_id));
  }

  async decode(signedInvite: SignedInvite) {
    const key: string = await this.connection
      .query(select_invite_key_query(signedInvite.id))
      .then(response => response[0]['key']);

    return await jwt.decode(signedInvite, key);
  }
}

export type SignedInvite = { invite: string; id: string };

function loteInvite(lote_id: string, barrio_id: string) {
  return { type: InviteType.ASSOCIATE_PROP, lote_id, barrio_id };
}

function select_invite_key_query(invite_id: string): string {
  return `SELECT key from invite where id = '${invite_id}';`;
}

function register_invite_query(): string {
  return 'SELECT * from register_invite();';
}
