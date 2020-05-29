import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountType } from 'src/authentication/account.type';
import { Repository } from 'typeorm';
import Session from './session.entity';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessionRepo: Repository<Session>) {}

  async create(account_id: string, device_id: string, type: AccountType): Promise<Session> {
    return await this.sessionRepo
      .query(create_session_query(account_id, device_id, type))
      .then(response => response[0]);
  }

  async verify(session_id: string): Promise<boolean> {
    return await this.sessionRepo
      .query(validate_session_query(session_id))
      .then(response => response[0]);
  }
}

const session_duration_in_days = 7;

function validate_session_query(session_id: string): string {
  return `SELECT * from verify_session('${session_id}'::uuid);`;
}

function create_session_query(account_id: string, device_id: string, type: AccountType): string {
  switch (type) {
    case AccountType.GUARDIA:
    case AccountType.USER:
      return `SELECT * from insert_user_session('${account_id}', '${device_id}', '${session_duration_in_days}');`;
    case AccountType.BARRIO:
      return `SELECT * from insert_barrio_session('${account_id}', '${session_duration_in_days}');`;
    default:
      throw new Error('Invalid account type');
  }
}
