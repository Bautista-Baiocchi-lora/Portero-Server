import { JwtService } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { SessionService } from '../session/session.service';
import { LogInDTO } from './log.in.dto';
export declare class AuthenticationService {
    private readonly connection;
    private readonly sessionService;
    private readonly jwtService;
    constructor(connection: Connection, sessionService: SessionService, jwtService: JwtService);
    authenticate(logInDTO: LogInDTO): Promise<Cookie>;
}
export declare type Cookie = {
    token: string;
    acc_id: string;
    email: string;
    session_id: string;
    type: number;
};
