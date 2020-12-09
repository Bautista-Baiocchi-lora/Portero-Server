import { Injectable } from '@nestjs/common';
import { bcryptHash } from 'src/encryption';

@Injectable()
export default class AccountService {
  async register(client, email: string, password: string): Promise<string> {
    password = await bcryptHash(password);

    return await client
      .query(create_account_query(email, password))
      .then((res) => res.rows[0].id);
  }
}

const create_account_query = (email: string, password: string) => {
  return {
    text: 'INSERT INTO account(email, password) values ($1, $2) returning id',
    values: [email, password],
  };
};
