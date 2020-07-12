import { Injectable } from '@nestjs/common';
import Session from './session.entity';

@Injectable()
export class JwtService {
  constructor() {}

  async sign(data: any, secret: string): Promise<string> {
    return await jwt.sign(data, secret);
  }

  async verify(token, secret: string): Promise<JwtSession> {
    return await jwt.verify(token, secret);
  }

  async decode(token): Promise<JwtSession> {
    return await jwt.decode(token);
  }
}

export type JwtSession = Session;

const jwt = require('jsonwebtoken');
