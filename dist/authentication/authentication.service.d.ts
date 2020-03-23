import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import Session from "./session.entity";
import { JwtService } from "./jwt.service";
import { SessionService } from "./session.service";
export declare class AuthenticationService {
    private readonly connection;
    private readonly jwtService;
    private readonly sessionService;
    constructor(connection: Connection, jwtService: JwtService, sessionService: SessionService);
    authenticate(logInDTO: LogInDTO): Promise<string>;
    logOut(session: Session): Promise<void>;
}
