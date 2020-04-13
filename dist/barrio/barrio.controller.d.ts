import { BarrioRegistrationDTO } from 'src/barrio/barrio.registration.dto';
import { BarrioService } from './barrio.service';
export default class BarrioController {
    private readonly barrioService;
    constructor(barrioService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
}
