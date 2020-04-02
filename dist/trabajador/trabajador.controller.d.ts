import TrabajadorRegistrationDTO from "./trabajador.registration.dto";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
import TrabajadorService from "./trabajador.service";
export default class TrabajadorController {
    private readonly trabajadorService;
    constructor(trabajadorService: TrabajadorService);
    register(registerDTO: TrabajadorRegistrationDTO): Promise<boolean>;
    login(logInDTo: LogInDTO): Promise<Cookie>;
}
