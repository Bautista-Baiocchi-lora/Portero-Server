import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./authentication.service";
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    authenticateBarrio(logInDTO: LogInDTO): Promise<boolean>;
}
