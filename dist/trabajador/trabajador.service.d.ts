import { Repository } from "typeorm";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
import { AuthenticationService } from "src/authentication/authentication.service";
import Trabajador from "./trabajador.entity";
import TrabajadorRegistrationDTO from "./trabajador.registration.dto";
export default class TrabajadorService {
    private readonly trabajadorRepo;
    private readonly authService;
    constructor(trabajadorRepo: Repository<Trabajador>, authService: AuthenticationService);
    register(registerDTO: TrabajadorRegistrationDTO): Promise<boolean>;
    getTrabajador(email: string): Promise<Trabajador>;
    authenticate(logInDto: LogInDTO): Promise<Cookie>;
}
