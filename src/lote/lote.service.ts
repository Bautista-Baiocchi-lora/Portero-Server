import { Injectable } from "@nestjs/common";
import CreateLoteDTO from "./create.lote.dto";
import { Connection } from "typeorm";

@Injectable()
export default class LoteService{

    constructor(private readonly connection:Connection){}

    async create(barrio_id:string, loteDTO:CreateLoteDTO){
        return await this.connection.query(insert_lote_query(barrio_id, loteDTO))
    }


}

function insert_lote_query(barrio_id: string, loteDTO:CreateLoteDTO): string{
    const {
        name,
        street,
        code, 
        num
    }=loteDTO

    return `SELECT insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`
}