import { Repository } from 'typeorm';
import Propietario from './propietario.entity';
import PropietarioRegistrationDTO from './propietario.registration.dto';
export default class PropietarioService {
    private readonly propietarioRepo;
    constructor(propietarioRepo: Repository<Propietario>);
    register(registerDTO: PropietarioRegistrationDTO): Promise<boolean>;
    getPropietario(email: string): Promise<Propietario>;
}
