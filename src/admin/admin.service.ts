import { Inject, Injectable } from '@nestjs/common';
import AccountService from 'src/account/account.service';
import { bcryptHash } from 'src/encryption';
import AdminRegistrationDTO from './admin.register.dto';

@Injectable()
export default class AdminService {
  constructor(
    @Inject('postgres') private readonly pool,
    private readonly accountService: AccountService,
  ) {}

  async register(registerDTO: AdminRegistrationDTO) {
    registerDTO.password = await bcryptHash(registerDTO.password);

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const acc_id = await this.accountService.register(
        client,
        registerDTO.email,
        registerDTO.password,
      );

      //register new barrios
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

const create_admin_query = (registerDTO: AdminRegistrationDTO) => {};
