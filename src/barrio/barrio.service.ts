import { Injectable, Body } from '@nestjs/common';
import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError, DeleteResult } from 'typeorm';
import { BarrioLogInDTO } from '../admin_panel/barrio.login.dto';

@Injectable()
export class BarrioService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepository: Repository<Barrio>){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
    return await this.barrioRepository.query(insert_barrio_query(registerDTO))
  }

  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>{
    return false;
  }

  async delete(email: string): Promise<DeleteResult>{
    return await this.barrioRepository.query(delete_barrio(email))
  }

}

function delete_barrio(email: string): string{
  return `delete from account where email = '${email}';`
}

function insert_barrio_query(registerDTO:BarrioRegistrationDTO):string {
  const {email, password, name}=registerDTO
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`
}