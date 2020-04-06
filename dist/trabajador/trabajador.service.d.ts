import { Repository } from "typeorm";
import Trabajador from "./trabajador.entity";
import TrabajadorRegistrationDTO from "./trabajador.registration.dto";
export default class TrabajadorService {
    private readonly trabajadorRepo;
    constructor(trabajadorRepo: Repository<Trabajador>);
    register(registerDTO: TrabajadorRegistrationDTO): Promise<boolean>;
    getTrabajador(email: string): Promise<any>;
}
