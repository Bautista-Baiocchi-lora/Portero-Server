import { LogInDTO } from "./log.in.dto";
import { SessionService } from "../session/session.service";
import { JwtService } from "src/session/jwt.service";
import { Connection } from "typeorm";
export declare class AuthenticationService {
    private readonly connection;
    private readonly sessionService;
    private readonly jwtService;
    constructor(connection: Connection, sessionService: SessionService, jwtService: JwtService);
    authenticate(logInDTO: LogInDTO): Promise<string>;
}
