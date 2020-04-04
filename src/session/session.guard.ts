import {  Injectable, CanActivate , ExecutionContext} from "@nestjs/common";
import Session from "./session.entity";
import { SessionService } from "./session.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class SessionGuard implements CanActivate{

    constructor(
        private readonly sessionService:SessionService,
        private readonly jwtService:JwtService
            ){}


    async canActivate(context: ExecutionContext): Promise<boolean>{
        const headers = context.switchToHttp().getRequest().headers

        const hasAuthHeader:boolean = Object.keys(headers).includes('authorization')
        if(hasAuthHeader){
            const jwt = headers.authorization;
            const validToken:boolean = await this.jwtService.verifyJWT(jwt)
            if(validToken){
                const session:Session = await this.jwtService.decodeJWT(jwt)
                return await this.sessionService.verify(session)
            }
        }
        return false
    }

}