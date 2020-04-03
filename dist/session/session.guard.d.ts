import { CanActivate, ExecutionContext } from "@nestjs/common";
import { SessionService } from "./session.service";
import { JwtService } from "./jwt.service";
export declare class SessionGuard implements CanActivate {
    private readonly sessionService;
    private readonly jwtService;
    constructor(sessionService: SessionService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
