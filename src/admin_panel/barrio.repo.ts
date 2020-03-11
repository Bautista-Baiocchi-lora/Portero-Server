import { Injectable } from "@nestjs/common";
import {Barrio} from './barrio.entity'
import { BarrioRegistrationDTO } from "./barrio.registration.dto";

@Injectable()
export class BarrioRepository{

    private barrios: Barrio[];

    async isNameTaken(name: string): Promise<boolean>{
        return this.barrios.map(barrio => barrio.name).includes(name);
    }

    async isEmailTaken(email: string): Promise<boolean>{
        return this.barrios.map(barrio => email).includes(email);
    }

    async save(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
        const oldLength = this.barrios.length
        return this.barrios.push({
            barrio_id: 123,
            email: registerDTO.email,
            name: registerDTO.name,
            password: registerDTO.password
        }) > oldLength
    }

    async register(registerDTO: BarrioRegistrationDTO): Promise<boolean> {
        const taken:boolean = await this.isEmailTaken(registerDTO.email) || await this.isNameTaken(registerDTO.name)
        if(!taken){
            return await this.save(registerDTO)
        }
        return false
    }

}