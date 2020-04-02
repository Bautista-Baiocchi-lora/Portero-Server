import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import Session from "src/authentication/session.entity";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
export default class BarrioController {
    private readonly barrioService;
    constructor(barrioService: BarrioService);
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    login(logInDTO: LogInDTO): Promise<Cookie>;
    getNewInvite(session: Session): Promise<string>;
}
