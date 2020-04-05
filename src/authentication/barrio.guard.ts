import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { AuthenticationError } from "./auth.error";
import { JwtService, JwtSession } from "src/session/jwt.service";

@Injectable()
export default class BarrioGuard implements CanActivate{

    constructor(private readonly jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const headers = context.switchToHttp().getRequest().headers

        const hasAuthHeader:boolean = Object.keys(headers).includes('authorization')
        if(hasAuthHeader){
            const jwt = headers.authorization;
            const validated: boolean = await this.jwtService.verifyJWT(jwt);
            if(validated){
                const session:JwtSession = await this.jwtService.decodeJWT(jwt)
                return session.type === BARRIO_TYPE;
            } 
        } 
        throw new AuthenticationError()
     }
}

const BARRIO_TYPE:number  = 0;