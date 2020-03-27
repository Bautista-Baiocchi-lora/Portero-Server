import { Injectable } from "@nestjs/common";
import Session from "./session.entity";
import { Connection } from "typeorm";
import { response } from "express";


const session_duration_in_days = 7

@Injectable()
export class SessionService{

    constructor(private readonly connection: Connection){}

    async create(account_id:number): Promise<Session>{
        return await this.connection.query(create_session_query(account_id))
        .then(parse_create_session_query)
    }

    //checking existance is enough to verify thanks jwt being secure and immutable
    async verify(session_id:string): Promise<boolean> {
        return await this.connection.query(create_session_exists_query(session_id))
        .then(parse_session_exists_query)
    }

}

function create_session_exists_query(session_id:string): string{
    return `SELECT exists(select 1 from account_session where id='${session_id}');`
}

//response format: [ { exists: true } ]
function parse_session_exists_query(response):boolean{
    return response[0].exists 
}

function parse_create_session_query(response):Session{
    response = response[0].create_session.replace('(','').replace(')','').replace('\"','').replace('"','').split(',');
    const session:Session = {
        id: response[0],
        account_id: parseInt(response[1]),
        creation_date: response[2],
        exp: parseInt(response[3])
    }
    return session
}

function create_session_query(account_id:number): string {
    return `SELECT create_session('${account_id}', '${session_duration_in_days}');`
}
