import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Trabajador from './trabajador.entity';
import TrabajadorRegistrationDTO from './trabajador.registration.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class TrabajadorService {
  constructor(
    @InjectRepository(Trabajador) private readonly trabajadorRepo: Repository<Trabajador>,
  ) {}

  async register(registerDTO: TrabajadorRegistrationDTO): Promise<boolean> {
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
    return await this.trabajadorRepo
      .query(create_insert_trabajador_query(registerDTO))
      .then(parse_insert_trabajador_query);
  }

  async getTrabajador(email: string): Promise<any> {
    return await this.trabajadorRepo.query(select_trabajador_query(email));
  }
}

function select_trabajador_query(email: string): string {
  return `SELECT select_trabajador('${email}');`;
}

function create_insert_trabajador_query(registerDTO: TrabajadorRegistrationDTO): string {
  const { email, password, first_name, last_name, doc_id, doc_type } = registerDTO;
  return `SELECT insert_trabajador('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}');`;
}

function parse_insert_trabajador_query(response): boolean {
  return !!response[0];
}
