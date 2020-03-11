import { BarrioRegistrationDTO } from "./barrio.registration.dto";
export declare class BarrioRepository {
    private barrios;
    isNameTaken(name: string): Promise<boolean>;
    isEmailTaken(email: string): Promise<boolean>;
    save(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
    register(registerDTO: BarrioRegistrationDTO): Promise<boolean>;
}
