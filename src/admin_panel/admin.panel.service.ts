import { Injectable } from '@nestjs/common';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarrioRepository } from './barrio.repo';
import { BarrioLogInDTO } from './barrio.login.dto';

@Injectable()
export class AdminPanelService {

  constructor(private readonly barrioRepository: BarrioRepository){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean>{
    return await this.barrioRepository.register(registerDTO);
  }

  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>{
    return false;
  }

}