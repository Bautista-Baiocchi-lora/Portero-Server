import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
import Session from "./session";
import { JwtService } from "./jwt.service";
export declare class AuthenticationService {
    private readonly connection;
    private readonly jwtService;
    constructor(connection: Connection, jwtService: JwtService);
    authenticate(logInDTO: LogInDTO): Promise<Session | any>;
    logOut(session: Session): Promise<void>;
}
