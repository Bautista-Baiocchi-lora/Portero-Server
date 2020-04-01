import { BarrioService } from '../barrio/barrio.service';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import Session from 'src/authentication/session.entity';
export declare class AdminPanelController {
    private readonly barrioService;
    constructor(barrioService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    getNewInvite(session: Session): Promise<string>;
}
