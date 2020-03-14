import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import { type } from "os";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthenticationService{

    
    constructor(private readonly connection: Connection){}

    async authenticate(logInDTO:LogInDTO){
         const response  = await this.connection.query(get_password_query(logInDTO));  
         const account = parse_select_account_reponse(response)
         
         const authenticated:boolean = await bcrypt.compare(logInDTO.password, account.password)

         //user authenticated, now to create their session
         if(authenticated){
            const response = await this.connection.query(create_session_query(account.id))
            const session_id = parse_create_session_response(response)
            return 
         }

         return authenticated;
    }

}

function parse_create_session_response(response){
    return response[0].create_session
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