import { Repository } from 'typeorm';
import CreateLoteDTO from './create.lote.dto';
import Lote from './lote.entity';
export default class LoteRepository {
    private readonly loteRepo;
    constructor(loteRepo: Repository<Lote>);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<void>;
}
