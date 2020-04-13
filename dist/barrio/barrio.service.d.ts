import InviteService from 'src/invite/invite.service';
import { DeleteResult, Repository } from 'typeorm';
import Barrio from './barrio.entity';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly inviteService;
    constructor(barrioRepo: Repository<Barrio>, inviteService: InviteService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    delete(email: string): Promise<DeleteResult>;
    private getBarrio;
}
