import { BarrioService } from '../barrio/barrio.service';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { BarrioLogInDTO } from './barrio.login.dto';
import { InsertResult } from 'typeorm';
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<InsertResult>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
}
