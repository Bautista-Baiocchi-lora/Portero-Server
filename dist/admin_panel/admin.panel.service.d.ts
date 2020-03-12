import { BarrioRegistrationDTO } from './barrio.registration.dto';
import Barrio from './barrio.entity';
import { Repository } from 'typeorm';
import { BarrioLogInDTO } from './barrio.login.dto';
export declare class AdminPanelService {
    private readonly barrioRepository;
    constructor(barrioRepository: Repository<Barrio>);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
}
