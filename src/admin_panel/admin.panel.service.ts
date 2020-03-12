import { Injectable } from '@nestjs/common';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import  Barrio from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarrioLogInDTO } from './barrio.login.dto';
import PostgreScriptQuery from '../api/PostgreScriptQuery';

@Injectable()
export class AdminPanelService {

  constructor(@InjectRepository(Barrio) private readonly barrioRepository: Repository<Barrio>){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean>{
    return await PostgreScriptQuery<boolean>('insert_barrio')
    .setParameters(registerDTO.email, registerDTO.password, registerDTO.name)
    .executeForSuccess(this.barrioRepository)
  }

  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>{
    return false;
  }

}