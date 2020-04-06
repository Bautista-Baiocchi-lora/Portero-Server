import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Trabajador from "./trabajador.entity";
import TrabajadorRegistrationDTO from "./trabajador.registration.dto";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export default class TrabajadorService{

    constructor(
        @InjectRepository(Trabajador) private readonly trabajadorRepo:Repository<Trabajador>
    ){}

    async register(registerDTO:TrabajadorRegistrationDTO): Promise<boolean>{
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds)
        return await this.trabajadorRepo.query(create_insert_trabajador_query(registerDTO)).then(parse_insert_trabajador_query)
    }

    async getTrabajador(email:string): Promise<Trabajador>{
        return await this.trabajadorRepo.query(select_trabajador_query(email)).then(parse_select_trabajador_query)
    }

}

function parse_select_trabajador_query(response):Trabajador{
    response = response[0].select_trabajador //extract from list
    response = response.replace('(','').replace(')', '') //remove paranthesis
    response = response.split(',') //split into array
    const propietario:Trabajador = {
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

function select_trabajador_query(email:string):string{
    return `SELECT select_trabajador('${email}');`
}

function create_insert_trabajador_query(registerDTO:TrabajadorRegistrationDTO): string{
    const {
        email,
        password, 
        first_name,
        last_name,
        doc_id,
        doc_type
            } = registerDTO
    return `SELECT insert_trabajador('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}');`
}

async function parse_insert_trabajador_query(response): Promise<boolean>{
    return !!response[0]
}