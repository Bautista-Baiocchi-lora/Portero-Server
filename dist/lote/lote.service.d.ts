import InviteService from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
import { Repository } from 'typeorm';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
import CreateLoteDTO from './create.lote.dto';
import Lote from './lote.entity';
export default class LoteService {
    private readonly loteRepo;
    private readonly inviteService;
    constructor(loteRepo: Repository<Lote>, inviteService: InviteService);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<boolean>;
    associatePropietario(associateDTO: AssociatePropietarioDTO, session: JwtSession): Promise<boolean>;
    getAllLotesOfPropietario(session: JwtSession): Promise<any[]>;
    getAllLotesAndPropietariosInBarrio(barrio_id: string): Promise<any[]>;
    delete(lote_id: string, barrio_id: string): Promise<import("typeorm").DeleteResult>;
}
