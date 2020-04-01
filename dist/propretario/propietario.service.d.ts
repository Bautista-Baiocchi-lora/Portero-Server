import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Connection } from "typeorm";
export default class PropietarioService {
    private readonly connection;
    constructor(connection: Connection);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
}
