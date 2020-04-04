import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import Session from "src/session/session.entity";
export default class BarrioController {
    private readonly barrioService;
    constructor(barrioService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    getNewInvite(session: Session): Promise<string>;
}
