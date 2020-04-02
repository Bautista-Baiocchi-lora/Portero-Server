import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Repository } from "typeorm";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
import { AuthenticationService } from "src/authentication/authentication.service";
import Propietario from "./propietario.entity";
export default class PropietarioService {
    private readonly propietarioRepo;
    private readonly authService;
    constructor(propietarioRepo: Repository<Propietario>, authService: AuthenticationService);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
    getPropietario(email: string): Promise<Propietario>;
    authenticate(logInDto: LogInDTO): Promise<Cookie>;
}
