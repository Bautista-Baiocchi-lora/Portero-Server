import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, InsertResult } from 'typeorm';
import { BarrioLogInDTO } from './barrio.login.dto';
export declare class AdminPanelService {
    private readonly barrioRepository;
    constructor(barrioRepository: Repository<Barrio>);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
}
