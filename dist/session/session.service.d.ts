import { Repository } from 'typeorm';
import Session from './session.entity';
export declare class SessionService {
    private readonly sessionRepo;
    constructor(sessionRepo: Repository<Session>);
    create(account_id: string): Promise<Session>;
}
