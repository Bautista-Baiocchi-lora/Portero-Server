import { Injectable, Body, Inject } from '@nestjs/common';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import  {Barrio} from './barrio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, QueryFailedError, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
import Session from 'src/session/session.entity';

const bcrypt = require('bcrypt');
const saltRounds = 8;

@Injectable()
export class BarrioService {

  constructor(
    @InjectRepository(Barrio) private readonly barrioRepo: Repository<Barrio>,
    private readonly inviteService: InviteService
    ){}

  async register(registerDTO: BarrioRegistrationDTO): Promise<boolean>{
    registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
    return await this.barrioRepo.query(insert_barrio_query(registerDTO)).then(parse_insert_barrio_query)
  }

  async delete(email: string): Promise<DeleteResult>{
    return await this.barrioRepo.query(delete_barrio_query(email))
  }

  async getNewInvite(session:Session): Promise<string>{
    return this.inviteService.createBarrioInvite(session.account_id)
  }

  private async getBarrio(email:string):Promise<Barrio>{
    return await this.barrioRepo.query(select_barrio_query(email)).then(parse_get_barrio_query)
  }

}

/*
Response format:
[
  {
    select_barrio: '(42,bautis@gmail.com,$2b$10$1rUbOGZAr12nMhyGGlam6uOyw5MDtiUFjCptEugOrl8lgvYY4Iyvi,"2020-03-26 21:23:01.725837",41,d)'
  }
]
*/
function parse_get_barrio_query(response):Barrio{
  response = response[0].select_barrio //extract from list
  response = response.replace('(','').replace(')', '') //remove paranthesis
  response = response.split(',') //split into array
  const barrio:Barrio = {
    id: +response[0],
    email: response[1],
    password: response[2],
    creation_date: response[3],
    name: response[5].replace('\"', '').replace('\"', '') //remove slashes and quotes
  }
  return barrio
}

function select_barrio_query(email:string): string{
  return `SELECT select_barrio('${email}');`
}

function parse_insert_barrio_query(response): boolean{
  return !!response[0]
}

function delete_barrio_query(email: string): string{
  return `DELETE from account WHERE email = '${email}';`
}

function insert_barrio_query(registerDTO:BarrioRegistrationDTO):string {
  const {email, password, name}=registerDTO
  return `SELECT insert_barrio('${email}', '${password}', '${name}');`
}