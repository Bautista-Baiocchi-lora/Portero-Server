import { Injectable } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import  Session from "./session.entity";
import { SessionService } from "./session.service";
import Propietario from "src/propretario/propietario.entity";
import { Barrio } from "src/barrio/barrio.entity";
import Cookie from "./cookie";


const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secret = "our super secret"

@Injectable()
export class AuthenticationService{
    
    constructor(private readonly sessionService:SessionService){}

    async authenticate(logInDTO:LogInDTO, account:Barrio | Propietario): Promise<string>{
         const authenticated:boolean = await bcrypt.compare(logInDTO.password, account.password)

         //user authenticated, now to create their session
         if(!authenticated){
            throw new Error('Invalid Credentials')
         }
         
         const session:Session  =  await this.sessionService.create(account.id)
         session.account = account
         return await this.signJWT(session)
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