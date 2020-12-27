import { Inject, Injectable } from '@nestjs/common';
import { select_account } from 'src/account/account.repo';
import { validateBcryptHash } from 'src/encryption';
import { sign } from 'src/session/jwt.helper';
import { Session } from 'src/session/session.entity';
import { create_session } from 'src/session/session.repo';
import { AuthenticationError } from './auth.error';
import LogInDTO from './log.in.dto';

@Injectable()
export default class AuthenticationService {
  constructor(@Inject('postgres') private readonly pool) {}

  async authenticate(logInDTO: LogInDTO) {
    const account = await select_account(this.pool, logInDTO.email);

    if (account == null) {
      throw new AuthenticationError('Invalid credentials.');
    }

    const validated: boolean = await validateBcryptHash(
      logInDTO.password,
      account.password,
    );

    if (!validated) {
      throw new AuthenticationError('Invalid credentials.');
    }

    const session: Session = await create_session(
      this.pool,
      account.id,
      days_till_session_exp,
    );

    session.exp = new Date(session.exp).getTime() / 1000; //exp to seconds from epoch

    const jwt = await sign(session, jwt_session_secret);

    return jwt;
  }
}

const days_till_session_exp = 5;
const jwt_session_secret = 'this is my secret';
