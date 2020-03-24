import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
import JwtService from 'src/authentication/jwt.service';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly inviteService;
    private readonly jwtService;
    constructor(barrioRepo: Repository<Barrio>, inviteService: InviteService, jwtService: JwtService);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    delete(email: string): Promise<DeleteResult>;
    getNewInvite(token: string): Promise<string>;
}
