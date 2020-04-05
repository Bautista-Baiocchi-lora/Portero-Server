import CreateLoteDTO from "./create.lote.dto";
import { Connection } from "typeorm";
export default class LoteService {
    private readonly connection;
    constructor(connection: Connection);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<any>;
}
