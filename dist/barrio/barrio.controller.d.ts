import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import { JwtSession } from "src/session/jwt.service";
export default class BarrioController {
    private readonly barrioService;
    constructor(barrioService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    getNewInvite(session: JwtSession): Promise<string>;
}
