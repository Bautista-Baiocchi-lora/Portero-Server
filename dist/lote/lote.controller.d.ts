import { SignedInvite } from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
import CreateLoteDTO from './create.lote.dto';
import LoteService from './lote.service';
export default class LoteController {
    private readonly loteService;
    constructor(loteService: LoteService);
    create(session: JwtSession, createDTO: CreateLoteDTO): Promise<boolean>;
    invite(lote_id: string, session: JwtSession): Promise<SignedInvite>;
    getAllLotes(session: JwtSession): Promise<any[]>;
    deleteLote(lote_id: string, session: JwtSession): Promise<import("typeorm").DeleteResult>;
    associatePropietario(lote_id: string, barrio_id: string, device_id: string, session: JwtSession): Promise<boolean>;
}
