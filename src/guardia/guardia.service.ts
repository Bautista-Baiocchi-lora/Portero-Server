import { Injectable } from '@nestjs/common';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { GuardiaRegistrationDTO } from './guardia.registration.dto';

@Injectable()
export default class GuardiaService {
  constructor(private readonly connection: Connection) {}

  async register(session: JwtSession, registerDTO: GuardiaRegistrationDTO): Promise<boolean> {
    return false;
  }
}
