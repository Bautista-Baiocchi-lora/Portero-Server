import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Session from './session.entity';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessionRepo: Repository<Session>) {}

  async create(account_id: string, mac_address: string): Promise<Session> {
    return await this.sessionRepo
      .query(create_session_query(account_id, mac_address))
      .then(response => response[0]);
  }

  async verify(session_id: string, account_id: string, mac_address: string): Promise<boolean> {
    return await this.sessionRepo
      .query(validate_session_query(session_id, account_id, mac_address))
      .then(response => !!response);
  }
}

const session_duration_in_days = 7;

function validate_session_query(
  session_id: string,
  account_id: string,
  mac_address: string,
): string {
  return `SELECT * from validate_session('${session_id}'::uuid, '${mac_address}', '${account_id}'::uuid);`;
}

function create_session_query(account_id: string, mac_address: string): string {
  return `SELECT * from create_session('${account_id}', '${mac_address}', '${session_duration_in_days}');`;
}
