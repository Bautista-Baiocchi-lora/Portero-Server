import { LogInDTO } from "./log.in.dto";
import Session from "./session.entity";
import { SessionService } from "./session.service";
import Propietario from "src/propretario/propietario.entity";
import { Barrio } from "src/barrio/barrio.entity";
export declare class AuthenticationService {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    authenticate(logInDTO: LogInDTO, account: Barrio | Propietario): Promise<string>;
    verifySession(session: Session): Promise<boolean>;
    private signJWT;
    verifyJWT(token: any): Promise<boolean>;
    decodeJWT(token: any): Promise<Session>;
}
