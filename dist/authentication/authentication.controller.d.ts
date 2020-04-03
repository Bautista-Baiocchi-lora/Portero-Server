import { LogInDTO } from "./log.in.dto";
import Cookie from "src/session/cookie";
import { AuthenticationService } from "./authentication.service";
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(logInDTo: LogInDTO): Promise<Cookie>;
}
