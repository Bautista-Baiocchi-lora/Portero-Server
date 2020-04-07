import Session from "./session.entity";
import { Repository } from "typeorm";
export declare class SessionService {
    private readonly sessionRepo;
    constructor(sessionRepo: Repository<Session>);
    create(account_id: string): Promise<Session>;
}
