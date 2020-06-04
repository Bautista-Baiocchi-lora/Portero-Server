import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtSession } from '../session/jwt.service';
import { MessageType } from './message.type';

const jwt = require('jsonwebtoken');

@Injectable()
export default class MessageService {
  constructor(private readonly connection: Connection) {}

  private async sign(data: any): Promise<SignedMessage> {
    const message = await this.connection.query(insert_message()).then(response => response[0]);
    const token = await jwt.sign(data, message.key);
    return {
      message: token,
      id: message.message_id,
    };
  }

  async createGuestInvite(invite_id: string): Promise<SignedMessage> {
    return await this.sign(guestInvite(invite_id));
  }

  async createPropietarioInvite(lote_id: string, session: JwtSession): Promise<SignedMessage> {
    return await this.sign(propietarioInvite(lote_id, session.acc_id));
  }

  async createGuardiaInvite(session: JwtSession): Promise<SignedMessage> {
    return await this.sign(guardiaInvite(session.acc_id, 0));
  }

  async decode(message: string, message_id: string) {
    const key: string = await this.connection
      .query(select_invite_key_query(message_id))
      .then(response => response[0]['encry_key']);

    return await jwt.decode(message, key);
  }
}

export type SignedMessage = { message: string; id: string };

const guestInvite = (invite_id: string) => {
  return {
    type: MessageType.INVITE_GUEST,
    invite_id,
  };
};

const guardiaInvite = (barrio_id: string, rank: number) => {
  return {
    type: MessageType.ASSOCIATE_GUARDIA,
    rank,
    barrio_id,
  };
};

const propietarioInvite = (lote_id: string, barrio_id: string) => {
  return {
    type: MessageType.ASSOCIATE_PROP,
    lote_id,
    barrio_id,
  };
};

function select_invite_key_query(message_id: string): string {
  return `SELECT encry_key from message where id = '${message_id}';`;
}

function insert_message(): string {
  return `SELECT * from insert_message();`;
}
