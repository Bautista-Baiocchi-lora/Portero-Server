import InviteService from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
import { Connection } from 'typeorm';
import { AssociatePropietarioDTO } from './associate.propietario.dto';
import CreateLoteDTO from './create.lote.dto';
export default class LoteService {
    private readonly loteRepo;
    private readonly inviteService;
    constructor(loteRepo: Connection, inviteService: InviteService);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<Lote>;
    associatePropietario(associateDTO: AssociatePropietarioDTO, session: JwtSession): Promise<boolean>;
    getAllLotesOfPropietario(session: JwtSession): Promise<any[]>;
    getAllLotesWithPropietariosByBarrio(barrio_id: string): Promise<any>;
    delete(lote_id: string): Promise<any>;
}
export declare type Lote = {
    id: string;
    name: string;
    street: string;
    num: number;
    code: number;
};
