import { Injectable } from "@nestjs/common";
import PropietarioRegistrationDTO from "./propietario.registration.dto";
import { Connection, Repository } from "typeorm";
import { AuthenticationService } from "src/authentication/auth.service";
import Propietario from "./propietario.entity";
import { InjectRepository } from "@nestjs/typeorm";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class PropietarioService{

    constructor(
        @InjectRepository(Propietario) private readonly propietarioRepo:Repository<Propietario>
    ){}

    async register(registerDTO:PropietarioRegistrationDTO): Promise<boolean>{
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
        return await this.propietarioRepo.query(create_insert_propietario_query(registerDTO)).then(parse_insert_propietario_query)
    }

    async getPropietario(email:string):Promise<Propietario>{
        return await this.propietarioRepo.query(select_propietario_query(email)).then(parse_select_propietario_query)
    }

}

function parse_select_propietario_query(response):Propietario{
    response = response[0].select_propietario //extract from list
    response = response.replace('(','').replace(')', '') //remove paranthesis
    response = response.split(',') //split into array
    const propietario:Propietario = {
        id:response[0],
        email:response[1],
        password: response[2],
        creation_date: response[3],
        first_name: response[5].replace('\"', '').replace('\"', ''), //remove slashes and quotes
        last_name: response[6].replace('\"', '').replace('\"', ''), //remove slashes and quotes
        doc_id: response[7],
        doc_type: +response[8]
    }
    return propietario
}

function select_propietario_query(email:string):string{
    return `SELECT select_propietario('${email}');`
}

function create_insert_propietario_query(registerDTO:PropietarioRegistrationDTO): string{
    const {
        email,
        password, 
        first_name,
        last_name,
        doc_id,
        doc_type
            } = registerDTO
    return `SELECT insert_propietario('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}');`
}

async function parse_insert_propietario_query(response): Promise<boolean>{
    return !!response[0]
}