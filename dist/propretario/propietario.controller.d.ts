import PropietarioRegistrationDTO from "./propietario.registration.dto";
import PropietarioService from "./propietario.service";
export default class PropietarioController {
    private readonly propietarioService;
    constructor(propietarioService: PropietarioService);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
}
