import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly inviteService;
    constructor(barrioRepo: Repository<Barrio>, inviteService: InviteService);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    delete(email: string): Promise<DeleteResult>;
}
