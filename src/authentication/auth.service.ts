import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import * as settings from '../server-config.json';
import Session from '../session/session.entity';
import { SessionService } from '../session/session.service';
import { AccountType } from './account.type';
import { AuthenticationError } from './auth.error';
import { LogInDTO } from './log.in.dto';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly connection: Connection,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(logInDTO: LogInDTO): Promise<AuthResponse> {
    const account: Account = await this.connection
      .query(select_account(logInDTO.email))
      .then(response => response[0]);
    const validated: boolean = await bcrypt.compare(logInDTO.password, account.password);

    if (!validated) {
      throw new AuthenticationError('Invalid credentials.');
    }

    const session: Session = await this.sessionService.create(
      account.id,
      logInDTO.mid,
      account.type,
    );

    const signedToken = await this.jwtService.sign(session, settings.jwt.session_secret);
    return this.connection
      .query(select_user(session.session_id, session.acc_type))
      .then(response => response[0])
      .then(user => {
        return { token: signedToken, user: { acc_type: session.acc_type, ...user } };
      });
  }
}

export type Account = {
  id: string;
  email: string;
  password: string;
  type: AccountType;
};

export type AuthResponse = {
  token: string;
  user: {
    email: string;
    acc_type: number;
    fn?: string;
    ln?: string;
    doc_id?: string;
    birth?: Date;
    barrio_name?: string;
  };
};

const select_user = (session_id: string, acc_type: number): string => {
  return `SELECT * FROM select_${acc_type > 0 ? 'person' : 'barrio'}_user('${session_id}');`;
};

const select_account = (email: string) => `SELECT * from select_account('${email}');`;
