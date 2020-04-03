import { Injectable } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import  Session from "../session/session.entity";
import { SessionService } from "../session/session.service";
import { JwtService } from "src/session/jwt.service";
import { Connection } from "typeorm";
import { AuthenticationError } from "./auth.error";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthenticationService{
    
    constructor(
        private readonly connection:Connection,
        private readonly sessionService:SessionService,
        private readonly jwtService:JwtService
        ){}

    async authenticate(logInDTO:LogInDTO): Promise<string>{
        const account = await this.connection.query(select_account_query(logInDTO.email)).then(parse_select_account)
        const validated:boolean = await bcrypt.compare(logInDTO.password, account.password)

        if(!validated){
            throw new AuthenticationError()
        }

        const session:Session  =  await this.sessionService.create(account.id)
        return await this.jwtService.signJWT(session)
    }

  
}

const select_account_query = (email:string) => `SELECT select_account('${email}');`

function parse_select_account(response){
    response = response[0].select_account.replace('(','').replace(')','').split(',')
    return {
        id: +response[0],
        email: response[1],
        password: response[2],
        type: +response[3]
    }
}
