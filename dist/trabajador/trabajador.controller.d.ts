import TrabajadorRegistrationDTO from './trabajador.registration.dto';
import TrabajadorService from './trabajador.service';
export default class TrabajadorController {
    private readonly trabajadorService;
    constructor(trabajadorService: TrabajadorService);
    register(registerDTO: TrabajadorRegistrationDTO): Promise<boolean>;
}
