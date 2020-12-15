import { Inject, Injectable } from '@nestjs/common';
import AccountService from 'src/account/account.service';
import LogInDTO from './log.in.dto';

@Injectable()
export default class AuthenticationService {
  constructor(
    @Inject('postgres') private readonly pool,
    private readonly accountService: AccountService,
  ) {}

  async authenticate(logInDTO: LogInDTO) {
    return this.accountService.get(logInDTO.email);
  }
}
