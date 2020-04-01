import { Injectable } from "@nestjs/common";
import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Connection } from "typeorm";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class PropietarioService{

    constructor(private readonly connection:Connection){}

    async register(registerDTO:PropietarioRegistrationDTO): Promise<boolean>{
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
        return await this.connection.query(create_insert_propietario_query(registerDTO)).then(parse_insert_propietario_query)
    }

}

function create_insert_propietario_query(registerDTO:PropietarioRegistrationDTO): string{
    const {
        email,
        password, 
        first_name,
        last_name,
        doc_id,
        doc_type,
        device_id
            } = registerDTO
    return `SELECT insert_propietario('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}', '${device_id}');`
}

async function parse_insert_propietario_query(response): Promise<boolean>{
    return !!response[0]
}