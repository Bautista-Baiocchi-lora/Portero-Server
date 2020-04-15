import { JwtSession } from 'src/session/jwt.service';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
import CreateLoteDTO from './create.lote.dto';
import LoteService from './lote.service';
export default class LoteController {
    private readonly loteService;
    constructor(loteService: LoteService);
    create(session: JwtSession, createDTO: CreateLoteDTO): Promise<boolean>;
    deleteLote(lote_id: string, session: JwtSession): Promise<import("typeorm").DeleteResult>;
    getBarrioLotes(session: JwtSession): Promise<any[]>;
    getPropietarioLotes(session: JwtSession): Promise<any>;
    associatePropietario(associateDTO: AssociatePropietarioDTO, session: JwtSession): Promise<boolean>;
}
