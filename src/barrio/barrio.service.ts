import { Injectable } from '@nestjs/common';
import { JwtSession } from 'src/session/jwt.service';
import { Connection, DeleteResult } from 'typeorm';
import * as query from './barrio.queries';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { DisableGuardiaDTO } from './disable.guardia.dto';
import { DisablePropietarioDTO } from './disable.propietario.dto';

const bcrypt = require('bcrypt');
const saltRounds = 8;

@Injectable()
export class BarrioService {
  constructor(private readonly connection: Connection) {}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
    return this.connection.query(query.insert_barrio(registerDTO)).then(response => !!response[0]);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.connection.query(query.delete_barrio(email));
  }

  async getAllLotes(session: JwtSession) {
    return this.connection.query(query.select_all_lotes(session.acc_id));
  }

  async getAllGuardias(session: JwtSession): Promise<any[]> {
    return this.connection.query(query.select_guardias_by_barrio(session.acc_id));
  }

  async disablePropietario(
    session: JwtSession,
    disableDTO: DisablePropietarioDTO,
  ): Promise<boolean> {
    return this.connection
      .query(query.disable_propietario(session.acc_id, disableDTO))
      .then(response => response[0]);
  }

  async disableGuardia(session: JwtSession, disableDTO: DisableGuardiaDTO): Promise<boolean> {
    return this.connection
      .query(query.disable_guardia(session.acc_id, disableDTO))
      .then(response => response[0]);
  }
}
