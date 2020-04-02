import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, DeleteResult } from 'typeorm';
import InviteService from 'src/invite/invite.service';
import Session from 'src/authentication/session.entity';
import { LogInDTO } from 'src/authentication/log.in.dto';
import { AuthenticationService } from 'src/authentication/authentication.service';
import Cookie from 'src/authentication/cookie';
export declare class BarrioService {
    private readonly barrioRepo;
    private readonly authService;
    private readonly inviteService;
    constructor(barrioRepo: Repository<Barrio>, authService: AuthenticationService, inviteService: InviteService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    delete(email: string): Promise<DeleteResult>;
    getNewInvite(session: Session): Promise<string>;
    private getBarrio;
    authenticate(logInDTO: LogInDTO): Promise<Cookie>;
}
