import CreateLoteDTO from "./create.lote.dto";
import { Repository } from "typeorm";
import Lote from "./lote.entity";
export default class LoteService {
    private readonly loteRepo;
    constructor(loteRepo: Repository<Lote>);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<any>;
    getAll(barrio_id: string): Promise<Lote[]>;
}
