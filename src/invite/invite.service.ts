import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

const jwt = require('jsonwebtoken');

@Injectable()
export default class InviteService {
  constructor(private readonly connection: Connection) {}

  async sign(invite: any): Promise<SignedInvite> {
    const registration = await this.connection
      .query(register_invite_query())
      .then(response => response[0]);
    const token = await jwt.sign(invite, registration.encry_key);
    return {
      invite: token,
      id: registration.invite_id,
    };
  }
}

export type SignedInvite = { invite: string; id: string };

function register_invite_query(): string {
  return 'SELECT * from register_invite();';
}
