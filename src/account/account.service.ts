import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { bcryptHash } from 'src/encryption';
import Account from './account.entity';
import { create_account, select } from './account.repo';

@Injectable()
export default class AccountService {
  constructor(@Inject('postgres') private readonly pool) {}

  async register(email: string, password: string): Promise<string> {
    password = await bcryptHash(password);

    return await create_account(this.pool, email, password);
  }

  async get(email: string): Promise<Account> {
    return await select(this.pool, email);
  }
}
