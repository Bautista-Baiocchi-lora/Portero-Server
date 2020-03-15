import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import { type } from "os";
import  Session from "./session";
import { Request, Response } from "express";
import { JwtService } from "./jwt.service";


const bcrypt = require('bcrypt');
const saltRounds = 10;
const session_duration_in_days = 7

@Injectable()
export class AuthenticationService{

    
    constructor(private readonly connection: Connection,
        private readonly jwtService:JwtService){}

    async authenticate(logInDTO:LogInDTO): Promise<Session|any>{
         const response  = await this.connection.query(get_password_query(logInDTO));  
         const account = parse_select_account_reponse(response)
         
         const authenticated:boolean = await bcrypt.compare(logInDTO.password, account.password)

         //user authenticated, now to create their session
         if(authenticated){
            const response = await this.connection.query(create_session_query(account.id))
            return this.jwtService.sign(parse_create_session_query(response))
         }
         return {}
        }

    async logOut(session:Session){
        
    }
}
       
function parse_select_account_reponse(response){
    response = response[0].select_account_password.split(',')
    return {
        "id": response[0].split('(')[1],
        "password": response[1].split(')')[0]
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

function get_password_query(logInDTO:LogInDTO): string{
    return `SELECT select_account_password('${logInDTO.email}');`
}