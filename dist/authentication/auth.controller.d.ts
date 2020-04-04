import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./auth.service";
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(logInDTo: LogInDTO): Promise<string>;
}
