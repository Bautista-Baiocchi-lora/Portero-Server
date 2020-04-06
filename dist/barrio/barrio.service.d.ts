import { BarrioRegistrationDTO } from './barrio.registration.dto';
import Barrio from './barrio.entity';
import { Repository, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly inviteService;
    constructor(barrioRepo: Repository<Barrio>, inviteService: InviteService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    delete(email: string): Promise<DeleteResult>;
    getNewInvite(session: JwtSession): Promise<string>;
    private getBarrio;
}
