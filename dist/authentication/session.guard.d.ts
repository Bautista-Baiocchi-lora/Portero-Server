import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
export declare class SessionGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthenticationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
