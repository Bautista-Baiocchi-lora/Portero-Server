import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Session from './session.entity';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessionRepo: Repository<Session>) {}

  async create(account_id: string): Promise<Session> {
    return await this.sessionRepo
      .query(create_session_query(account_id))
      .then(response => response[0]);
  }
}

const session_duration_in_days = 7;

function create_session_query(account_id: string): string {
  return `SELECT * from create_session('${account_id}', '${session_duration_in_days}');`;
}
