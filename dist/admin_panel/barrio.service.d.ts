import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { BarrioLogInDTO } from './barrio.login.dto';
export declare class BarrioService {
    private readonly barrioRepository;
    constructor(barrioRepository: Repository<Barrio>);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
    delete(email: string): Promise<DeleteResult>;
}
