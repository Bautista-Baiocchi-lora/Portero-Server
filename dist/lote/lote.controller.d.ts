import { JwtSession } from 'src/session/jwt.service';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
import CreateLoteDTO from './create.lote.dto';
import LoteService, { Lote } from './lote.service';
export default class LoteController {
    private readonly loteService;
    constructor(loteService: LoteService);
    create(session: JwtSession, createDTO: CreateLoteDTO): Promise<Lote>;
    deleteLote(lote_id: string): Promise<any>;
    getBarrioLotes(session: JwtSession): Promise<any[]>;
    getPropietarioLotes(session: JwtSession): Promise<any[]>;
    associatePropietario(associateDTO: AssociatePropietarioDTO, session: JwtSession): Promise<boolean>;
}
