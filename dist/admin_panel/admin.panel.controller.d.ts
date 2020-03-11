import { AdminPanelService } from './admin.panel.service';
import { RegisterBarrioDTO } from './RegisterBarrioDTO';
export declare class AdminPanelController {
    private readonly adminService;
    constructor(adminService: AdminPanelService);
    register(registerDTO: RegisterBarrioDTO): Promise<boolean>;
}
