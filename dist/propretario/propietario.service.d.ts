import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Repository } from "typeorm";
import Propietario from "./propietario.entity";
export default class PropietarioService {
    private readonly propietarioRepo;
    constructor(propietarioRepo: Repository<Propietario>);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
    getPropietario(email: string): Promise<Propietario>;
}
