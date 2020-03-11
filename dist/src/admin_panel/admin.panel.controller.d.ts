import { AdminPanelService } from './admin.panel.service';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { BarrioLogInDTO } from './barrio.login.dto';
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: AdminPanelService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    authenticate(logInDTO: BarrioLogInDTO): Promise<boolean>;
}
