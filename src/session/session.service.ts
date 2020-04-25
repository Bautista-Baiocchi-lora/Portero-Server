import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceType } from '../authentication/device.type';
import Session from './session.entity';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(Session) private readonly sessionRepo: Repository<Session>) {}

  async create(account_id: string, device_id: string, type: DeviceType): Promise<Session> {
    return await this.sessionRepo
      .query(create_session_query(account_id, device_id, type))
      .then(response => response[0]);
  }

  async verify(session_id: string, account_id: string, device_id: string): Promise<boolean> {
    return await this.sessionRepo
      .query(validate_session_query(session_id, account_id, device_id))
      .then(response => !!response);
  }
}

const session_duration_in_days = 7;

function validate_session_query(session_id: string, account_id: string, device_id: string): string {
  return `SELECT * from validate_session('${session_id}'::uuid, '${device_id}', '${account_id}'::uuid);`;
}

function create_session_query(account_id: string, device_id: string, type: DeviceType): string {
  return `SELECT * from create_session('${account_id}', '${device_id}', '${type}', '${session_duration_in_days}');`;
}
