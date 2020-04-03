import { Injectable } from "@nestjs/common";
import Session from "./session.entity";

@Injectable()
export class JwtService{

    constructor(){}

    async signJWT(session:Session):Promise<string>{
        return await jwt.sign(session, secret);
    }

    async verifyJWT(token):Promise<boolean>{
        return await jwt.verify(token, secret)
    }

    async decodeJWT(token):Promise<Session>{
        return await jwt.decode(token)
    }

}


const jwt = require('jsonwebtoken');
const secret = "our super secret"