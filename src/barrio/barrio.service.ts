import { Inject, Injectable } from '@nestjs/common';
import AccountService from 'src/account/account.service';
import BarrioRegistrationDTO from './barrio.register.dto';

@Injectable()
export default class BarrioService {
  constructor(
    @Inject('postgres') private readonly pool,
    private readonly accountService: AccountService,
  ) {}

  async register(registerDTO: BarrioRegistrationDTO) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const acc_id = await this.accountService.register(
        client,
        registerDTO.email,
        registerDTO.password,
      );

      await client.query(create_barrio_query(acc_id, registerDTO.name));
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

const create_barrio_query = (acc_id: string, name: string) => {
  return {
    text: 'INSERT INTO barrio (id, name) values ($1, $2)',
    values: [acc_id, name],
  };
};
