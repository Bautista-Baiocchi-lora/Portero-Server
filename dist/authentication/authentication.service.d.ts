import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import Session from "./session.entity";
import { SessionService } from "./session.service";
export declare class AuthenticationService {
    private readonly connection;
    private readonly sessionService;
    constructor(connection: Connection, sessionService: SessionService);
    authenticate(logInDTO: LogInDTO): Promise<string>;
    logOut(session: Session): Promise<void>;
    verifySession(session: Session): Promise<boolean>;
    private signJWT;
    verifyJWT(token: any): Promise<boolean>;
    decodeJWT(token: any): Promise<Session>;
}
