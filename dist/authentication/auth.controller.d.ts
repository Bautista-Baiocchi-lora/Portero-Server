import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./auth.service";
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(logInDTO: LogInDTO): Promise<string>;
}
