import { Inject, Injectable } from '@nestjs/common';
import BarrioRegistrationDTO from './barrio.register.dto';
import { create_barrio } from './barrio.repo';

@Injectable()
export default class BarrioService {
  constructor(@Inject('postgres') private readonly pool) {}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    const client = await this.pool.connect();
    return await create_barrio(client, registerDTO);
  }
}
