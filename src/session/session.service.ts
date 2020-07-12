import { Injectable } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { Connection } from 'typeorm';
import Session from './session.entity';

@Injectable()
export class SessionService {
  constructor(private readonly connection: Connection) {}

  async create(account_id: string, device_id: string, type: AccountType): Promise<Session> {
    return await this.connection
      .query(create_session(account_id, device_id, type))
      .then(response => response[0])
      .then(session => {
        return { ...session, acc_type: type };
      });
  }

  async verify(session_id: string): Promise<boolean> {
    return await this.connection.query(validate_session(session_id)).then(response => response[0]);
  }
}

const session_duration_in_days = 1;

const validate_session = (session_id: string): string => {
  return `SELECT * from verify_session('${session_id}'::uuid);`;
};

const create_session = (account_id: string, device_id: string, type: AccountType): string => {
  switch (type) {
    case AccountType.GUARDIA:
    case AccountType.USER:
      return `SELECT * from insert_user_session('${account_id}', '${device_id}', '${session_duration_in_days}');`;
    case AccountType.BARRIO:
      return `SELECT * from insert_barrio_session('${account_id}', '${session_duration_in_days}');`;
    default:
      throw new Error('Invalid account type');
  }
};
