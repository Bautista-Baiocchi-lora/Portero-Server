import { ExecutionContext, CanActivate } from "@nestjs/common";
import { JwtService } from "src/session/jwt.service";
export default class BarrioGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
