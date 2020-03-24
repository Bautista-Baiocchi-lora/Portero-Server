import { Injectable, Body } from '@nestjs/common';
import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class BarrioService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepo: Repository<Barrio>,
    private readonly inviteService: InviteService){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
    return await this.barrioRepo.query(insert_barrio_query(registerDTO))
  }

  async delete(email: string): Promise<DeleteResult>{
    return await this.barrioRepo.query(delete_barrio_query(email))
  }

}

function delete_barrio_query(email: string): string{
  return `DELETE from account WHERE email = '${email}';`
}

function insert_barrio_query(registerDTO:BarrioRegistrationDTO):string {
  const {email, password, name}=registerDTO
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`
}