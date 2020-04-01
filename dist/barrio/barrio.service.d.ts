import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
import Session from 'src/authentication/session.entity';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly inviteService;
    constructor(barrioRepo: Repository<Barrio>, inviteService: InviteService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    delete(email: string): Promise<DeleteResult>;
    getNewInvite(session: Session): Promise<string>;
}
