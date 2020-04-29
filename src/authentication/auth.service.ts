import { Injectable } from '@nestjs/common';
import { JwtService, JwtSession } from 'src/session/jwt.service';
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

  async authenticate(logInDTO: LogInDTO): Promise<Cookie> {
    const account: Account = await this.connection
      .query(select_account_query(logInDTO.email))
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
    const token: JwtSession = { ...session, email: account.email, type: account.type };
    const signedToken = await this.jwtService.sign(token, settings.jwt.session_secret);

    return {
      token: signedToken,
      acc_id: account.id,
      email: account.email,
      session_id: session.session_id,
      type: account.type,
    };
  }
}

export type Account = {
  id: string;
  email: string;
  password: string;
  type: AccountType;
};

export type Cookie = {
  token: string;
  acc_id: string;
  email: string;
  session_id: string;
  type: number;
};

const select_account_query = (email: string) => `SELECT * from select_account('${email}');`;
