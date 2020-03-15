import { BarrioService } from '../barrio/barrio.service';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { InsertResult } from 'typeorm';
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    test(): boolean;
}
