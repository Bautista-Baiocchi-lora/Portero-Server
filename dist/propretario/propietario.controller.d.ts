import PropietarioRegistrationDTO from "./propietario.registration.dto";
import PropietarioService from "./propietario.service";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
export default class PropietarioController {
    private readonly propietarioService;
    constructor(propietarioService: PropietarioService);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
    login(logInDTo: LogInDTO): Promise<Cookie>;
}
