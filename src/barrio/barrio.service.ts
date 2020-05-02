import { Injectable } from '@nestjs/common';
import { JwtSession } from 'src/session/jwt.service';
import { Connection, DeleteResult } from 'typeorm';
import * as query from './barrio.queries';
import { BarrioRegistrationDTO } from './barrio.registration.dto';

const bcrypt = require('bcrypt');
const saltRounds = 8;

@Injectable()
export class BarrioService {
  constructor(private readonly connection: Connection) {}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
    return await this.connection
      .query(query.insert_barrio_query(registerDTO))
      .then(query.parse_insert_barrio_query);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.connection.query(query.delete_barrio_query(email));
  }

  async getAllLotes(session: JwtSession) {
    return await this.connection.query(query.select_all_lotes(session.acc_id));
  }
}
