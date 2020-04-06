import { Injectable } from "@nestjs/common";
import CreateLoteDTO from "./create.lote.dto";
import { Connection, Repository } from "typeorm";
import Lote from "./lote.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export default class LoteService{

    constructor(@InjectRepository(Lote) private readonly loteRepo:Repository<Lote>){}

    async create(barrio_id:string, loteDTO:CreateLoteDTO){
        return await this.loteRepo.query(insert_lote_query(barrio_id, loteDTO))
    }

    async getAll(barrio_id:string):Promise<Lote[]>{
        return await this.loteRepo.query(select_lotes_query(barrio_id))
    }

}

function select_lotes_query(barrio_id:string): string{
    return `SELECT`
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