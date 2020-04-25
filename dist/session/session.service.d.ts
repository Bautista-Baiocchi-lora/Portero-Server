import { Repository } from 'typeorm';
import { DeviceType } from '../authentication/device.type';
import Session from './session.entity';
export declare class SessionService {
    private readonly sessionRepo;
    constructor(sessionRepo: Repository<Session>);
    create(account_id: string, device_id: string, type: DeviceType): Promise<Session>;
    verify(session_id: string, account_id: string, device_id: string): Promise<boolean>;
}
