import {  Injectable, CanActivate , ExecutionContext} from "@nestjs/common";
import { JwtService, JwtSession } from "./jwt.service";
import { AuthenticationError } from "src/authentication/auth.error";


@Injectable()
export class SessionGuard implements CanActivate{

    constructor(private readonly jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const headers = context.switchToHttp().getRequest().headers

        const hasAuthHeader:boolean = Object.keys(headers).includes('authorization')
        if(hasAuthHeader){
            const jwt = headers.authorization;
            return await this.jwtService.verifyJWT(jwt)
        } 
        throw new AuthenticationError
    }

}