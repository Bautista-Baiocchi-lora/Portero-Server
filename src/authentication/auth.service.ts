import { Injectable } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import  Session from "../session/session.entity";
import { SessionService } from "../session/session.service";
import { JwtService, JwtSession } from "src/session/jwt.service";
import { Connection } from "typeorm";
import { AuthenticationError } from "./auth.error";
import { response } from "express";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService{
    
    constructor(
        private readonly connection:Connection,
        private readonly sessionService:SessionService,
        private readonly jwtService:JwtService
        ){}

    async authenticate(logInDTO:LogInDTO): Promise<string>{
        const account = await this.connection.query(select_account_query(logInDTO.email)).then(response => response[0])
        const validated:boolean = await bcrypt.compare(logInDTO.password, account.password)

        if(!validated){
            throw new AuthenticationError()
        }

        const session:Session  =  await this.sessionService.create(account.id)
        const token:JwtSession = {...session, email: account.email, type: account.type}

        return await this.jwtService.signJWT(token)
    }

  
}

const select_account_query = (email:string) => `SELECT * from select_account('${email}');`

