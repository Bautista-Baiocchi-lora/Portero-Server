import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { BarrioRepository } from './barrio.repo';
import { BarrioLogInDTO } from './barrio.login.dto';
export declare class AdminPanelService {
    private readonly barrioRepository;
    constructor(barrioRepository: BarrioRepository);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
}
