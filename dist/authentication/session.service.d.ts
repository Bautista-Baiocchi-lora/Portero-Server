import Session from "./session.entity";
import { Connection } from "typeorm";
export declare class SessionService {
    private readonly connection;
    constructor(connection: Connection);
    createSession(account_id: number): Promise<Session>;
}
