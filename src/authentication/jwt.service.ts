import { Injectable, createParamDecorator } from "@nestjs/common";
import Session from "./session.entity";

const jwt = require('jsonwebtoken');
const secret = "our super secret"

@Injectable()
export default class JwtService{

    async sign(session:Session):Promise<string>{
        return await jwt.sign(session, secret);
    }

    async verify(token):Promise<boolean>{
        return await jwt.verify(token, secret)
    }

    async decode(token):Promise<Session>{
        return await jwt.decode(token)
    }


}

export const JwtToken = createParamDecorator(
    (data: unknown, ctx) => {
         return ctx.headers['authorization']
    }

)