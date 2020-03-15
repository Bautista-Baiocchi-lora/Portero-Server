import { Injectable } from "@nestjs/common";
import Session from "./session";
import { Connection } from "typeorm";


const session_duration_in_days = 7

@Injectable()
export class SessionService{

    constructor(private readonly connection: Connection){}

    async createSession(account_id:number): Promise<Session>{
        const response = await this.connection.query(create_session_query(account_id))
       return parse_create_session_query(response)
    }

}

function parse_create_session_query(response):Session{
    response = response[0].create_session.replace('(','').replace(')','').replace('\"','').replace('"','').split(',');
    const session:Session = {
        session_id: response[0],
        account_id: parseInt(response[1]),
        creation_date: response[2],
        exp: parseInt(response[3])
    }
    return session
}

function create_session_query(account_id:number): string {
    return `SELECT create_session('${account_id}', '${session_duration_in_days}');`
}
