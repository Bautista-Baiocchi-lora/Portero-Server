import { NestMiddleware, Injectable, CanActivate , ExecutionContext} from "@nestjs/common";
import { JwtService } from "./jwt.service";

@Injectable()
export class SessionGuard implements CanActivate{


    constructor(private readonly jwtService:JwtService){}


    async canActivate(context: ExecutionContext): Promise<boolean>{
        const headers = context.switchToHttp().getRequest().headers

        const hasAuthHeader:boolean = Object.keys(headers).includes('authorization')
        if(hasAuthHeader){
            return await this.jwtService.verify(headers.authorization);
        }

        return false
    }

}