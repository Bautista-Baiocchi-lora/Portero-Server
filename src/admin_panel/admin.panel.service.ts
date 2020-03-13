import { Injectable, Body } from '@nestjs/common';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError } from 'typeorm';
import { BarrioLogInDTO } from './barrio.login.dto';
import PostgreScriptQuery from '../api/PostgreScriptQuery';

@Injectable()
export class AdminPanelService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepository: Repository<Barrio>){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
    const barrio = {email:registerDTO.email, password: registerDTO.password,name:registerDTO.name}
    return await this.barrioRepository.createQueryBuilder().insert().into(Barrio).values([{email:registerDTO.email, password: registerDTO.password,name:registerDTO.name}]).execute()
  }

  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>{
    return false;
  }

}