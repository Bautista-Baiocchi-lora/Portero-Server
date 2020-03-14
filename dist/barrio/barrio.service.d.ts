import { BarrioRegistrationDTO } from '../admin_panel/barrio.registration.dto';
import { Barrio } from './barrio.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
export declare class BarrioService {
    private readonly barrioRepository;
    constructor(barrioRepository: Repository<Barrio>);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    delete(email: string): Promise<DeleteResult>;
}
