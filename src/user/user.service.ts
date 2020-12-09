import { Inject, Injectable } from '@nestjs/common';
import AccountService from 'src/account/account.service';
import UserRegistrationDTO from './user.register.dto';

@Injectable()
export default class UserService {
  constructor(
    @Inject('postgres') private readonly pool,
    private readonly accountService: AccountService,
  ) {}

  async register(registerDTO: UserRegistrationDTO): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const acc_id = await this.accountService.register(
        client,
        registerDTO.email,
        registerDTO.password,
      );

      await client.query(create_person_query(acc_id, registerDTO));
      await client.query('COMMIT');
      return true;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

const create_person_query = (acc_id, registerDTO: UserRegistrationDTO) => {
  return {
    text:
      'INSERT INTO person(id, first_name, last_name, birth_date, doc_id) values ($1, $2, $3, $4, $5)',
    values: [
      acc_id,
      registerDTO.first_name,
      registerDTO.last_name,
      registerDTO.birth_date,
      registerDTO.doc_id,
    ],
  };
};
