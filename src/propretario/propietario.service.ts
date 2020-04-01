import { Injectable } from "@nestjs/common";
import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Connection } from "typeorm";

@Injectable()
export default class PropietarioService{

    constructor(private readonly connection:Connection){}

    async register(registrationDTO:PropietarioRegistrationDTO){
        return await this.connection.query(create_insert_propietario_query(registrationDTO))
    }

}

function create_insert_propietario_query(registrationDTO:PropietarioRegistrationDTO): string{
    const {
        email,
        password, 
        first_name,
        last_name,
        doc_id,
        doc_type,
        device_id
            } = registrationDTO
    return `SELECT insert_propietario('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}', '${device_id}');`
}