import { Inject, Injectable } from '@nestjs/common';
import UserRegistrationDTO from './user.register.dto';
import { create_user } from './user.repo';

@Injectable()
export default class UserService {
  constructor(@Inject('postgres') private readonly pool) {}

  async register(registerDTO: UserRegistrationDTO): Promise<boolean> {
    const client = await this.pool.connect();

    return await create_user(client, registerDTO);
  }
}
