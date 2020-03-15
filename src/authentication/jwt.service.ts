import { Injectable } from "@nestjs/common";
import Session from "./session";

const jwt = require('jsonwebtoken');
const secret = "our super secret"

@Injectable()
export class JwtService{

    async sign(session:Session):Promise<any>{
        return await jwt.sign(session, secret);
    }

    async verify(token):Promise<boolean>{
        return await jwt.verify(token, secret)
    }

    async decode(token):Promise<Session>{
        return await jwt.decode(token)
    }


}