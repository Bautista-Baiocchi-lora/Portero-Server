import {  Injectable, CanActivate , ExecutionContext} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import Session from "./session.entity";

@Injectable()
export class SessionGuard implements CanActivate{

    constructor(private readonly authService:AuthenticationService){}


    async canActivate(context: ExecutionContext): Promise<boolean>{
        const headers = context.switchToHttp().getRequest().headers

        const hasAuthHeader:boolean = Object.keys(headers).includes('authorization')
        if(hasAuthHeader){
            const jwt = headers.authorization;
            const validToken:boolean = await this.authService.verifyJWT(jwt)
            if(validToken){
                const session:Session = await this.authService.decodeJWT(jwt)
                return await this.authService.verifySession(session)
            }
        }
        return false
    }

}