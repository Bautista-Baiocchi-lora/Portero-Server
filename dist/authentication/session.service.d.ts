import Session from "./session.entity";
import { Connection } from "typeorm";
export declare class SessionService {
    private readonly connection;
    constructor(connection: Connection);
    create(account_id: number): Promise<Session>;
    verify(session_id: string): Promise<boolean>;
}
