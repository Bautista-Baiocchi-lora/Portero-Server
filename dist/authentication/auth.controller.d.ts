import { AuthenticationService, Cookie } from './auth.service';
import { LogInDTO } from './log.in.dto';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(logInDTO: LogInDTO): Promise<Cookie>;
}
