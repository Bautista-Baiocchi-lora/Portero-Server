import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import { type } from "os";
import  Session from "./session.entity";
import { Request, Response } from "express";
import { SessionService } from "./session.service";


const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secret = "our super secret"

@Injectable()
export class AuthenticationService{

    
    constructor(private readonly connection: Connection,
        private readonly sessionService:SessionService){}

    async authenticate(logInDTO:LogInDTO): Promise<string>{
         const response  = await this.connection.query(get_password_query(logInDTO));  
         const account = parse_select_account_reponse(response)
         
         const authenticated:boolean = await bcrypt.compare(logInDTO.password, account.password)

         //user authenticated, now to create their session
         if(authenticated){
            const session  =  await this.sessionService.create(account.id)
            return await this.signJWT(session)
         }
         return 'Invalid credentials.'
        }

    async logOut(session:Session){
        
    }

    async verifySession(session:Session):Promise<boolean>{
        //expired
        if(new Date(session.exp) > new Date()){
            return false
        }
        return await this.sessionService.verify(session.id)
    }

    private async signJWT(session:Session):Promise<string>{
        return await jwt.sign(session, secret);
    }

    async verifyJWT(token):Promise<boolean>{
        return await jwt.verify(token, secret)
    }

    async decodeJWT(token):Promise<Session>{
        return await jwt.decode(token)
    }
}


       
function parse_select_account_reponse(response){
    response = response[0].select_account_password.split(',')
    return {
        "id": response[0].split('(')[1],
        "password": response[1].split(')')[0]
    }
}

function get_password_query(logInDTO:LogInDTO): string{
    return `SELECT select_account_password('${logInDTO.email}');`
}