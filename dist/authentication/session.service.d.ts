import Session from "./session.entity";
import { Repository } from "typeorm";
export declare class SessionService {
    private readonly sessionRepo;
    constructor(sessionRepo: Repository<Session>);
    create(account_id: number): Promise<Session>;
    verify(session_id: string): Promise<boolean>;
}
