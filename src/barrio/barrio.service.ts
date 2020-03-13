import { Injectable, Body } from '@nestjs/common';
import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError, DeleteResult } from 'typeorm';
import { BarrioLogInDTO } from '../admin_panel/barrio.login.dto';
import PostgreScriptQuery from '../api/PostgreScriptQuery';

@Injectable()
export class BarrioService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepository: Repository<Barrio>){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
    const {email, password, name}=registerDTO
    return await this.barrioRepository.createQueryBuilder().insert().into(Barrio).values([{email, password, name}]).execute()
  }

  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>{
    return false;
  }

  async delete(email: string): Promise<DeleteResult>{
    return await this.barrioRepository.createQueryBuilder()
    .delete()
    .from(Barrio)
    .where('email = :email', {email})
    .execute()
  }

}