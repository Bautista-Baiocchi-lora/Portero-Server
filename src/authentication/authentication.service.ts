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

            const session:Session = {
                session_id: response[0].create_session,
                account_id: account.id
            }
            return this.jwtService.sign(session);
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

function create_session_query(account_id:number): string {
    return `SELECT create_session('${account_id}');`
}

function get_password_query(logInDTO:LogInDTO): string{
    return `SELECT select_account_password('${logInDTO.email}');`
}