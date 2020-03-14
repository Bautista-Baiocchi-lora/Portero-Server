import { Injectable, Body } from '@nestjs/common';
import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError, DeleteResult } from 'typeorm';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class BarrioService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepository: Repository<Barrio>){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
    return await this.barrioRepository.query(insert_barrio_query(registerDTO))
  }

  async delete(email: string): Promise<DeleteResult>{
    return await this.barrioRepository.query(delete_barrio_query(email))
  }

}

function delete_barrio_query(email: string): string{
  return `DELETE from account WHERE email = '${email}';`
}

function insert_barrio_query(registerDTO:BarrioRegistrationDTO):string {
  const {email, password, name}=registerDTO
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`
}