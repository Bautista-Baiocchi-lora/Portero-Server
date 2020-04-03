import { Injectable } from "@nestjs/common";
import Session from "./session.entity";
import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class SessionService{

    constructor(@InjectRepository(Session) private readonly sessionRepo:Repository<Session>){}

    async create(account_id:number): Promise<Session>{
        return await this.sessionRepo.query(create_session_query(account_id)).then(parse_create_session_query)
    }

    //checking existance is enough to verify thanks jwt being secure and immutable
    async verify(session:Session): Promise<boolean> {
        if(new Date(session.exp) > new Date()){
            return false
        }
        return await this.sessionRepo.query(create_session_exists_query(session.id))
        .then(parse_session_exists_query)
    }

}


const session_duration_in_days = 7


function parse_create_session_query(response):Session{
    response = response[0].create_session.replace('(','').replace(')','').replace('\"','').replace('"','').split(',');
    const session:Session = {
        id: response[0],
        account_id: +response[1],
        creation_date: response[2],
        exp: +response[3]
    }
    return session
}

function create_session_exists_query(session_id:string): string{
    return `SELECT exists(select 1 from account_session where id='${session_id}');`
}

//response format: [ { exists: true } ]
function parse_session_exists_query(response):boolean{
    return response[0].exists 
}

function create_session_query(account_id:number): string {
    return `SELECT create_session('${account_id}', '${session_duration_in_days}');`
}
