import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { Reflector } from "@nestjs/core";
import { UserType } from "src/authentication/user.type";
export default class SessionGuard implements CanActivate {
    private readonly jwtService;
    private reflector;
    constructor(jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const UserTypes: (...type: UserType[]) => (target: object, key?: any, descriptor?: any) => any;
