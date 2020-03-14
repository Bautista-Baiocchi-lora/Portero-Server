import { Connection } from "typeorm";
import { LogInDTO } from "./log.in.dto";
export declare class AuthenticationService {
    private readonly connection;
    constructor(connection: Connection);
    authenticate(logInDTO: LogInDTO): Promise<any>;
}
