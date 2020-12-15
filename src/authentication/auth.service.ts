import { Inject, Injectable } from '@nestjs/common';
import { select_account } from 'src/account/account.repo';
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

    return true;
  }
}
