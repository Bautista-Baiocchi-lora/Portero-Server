import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Barrio from './barrio.entity';
import { BarrioRegistrationDTO } from './barrio.registration.dto';

const bcrypt = require('bcrypt');
const saltRounds = 8;

@Injectable()
export class BarrioService {
  constructor(@InjectRepository(Barrio) private readonly barrioRepo: Repository<Barrio>) {}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
    return await this.barrioRepo
      .query(insert_barrio_query(registerDTO))
      .then(parse_insert_barrio_query);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.barrioRepo.query(delete_barrio_query(email));
  }
}

function parse_insert_barrio_query(response): boolean {
  return !!response[0];
}

function delete_barrio_query(email: string): string {
  return `DELETE from account WHERE email = '${email}';`;
}

function insert_barrio_query(registerDTO: BarrioRegistrationDTO): string {
  const { email, password, name } = registerDTO;
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`;
}
