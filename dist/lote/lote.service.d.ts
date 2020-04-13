import InviteService, { SignedInvite } from 'src/invite/invite.service';
import { JwtSession } from 'src/session/jwt.service';
import { Repository } from 'typeorm';
import CreateLoteDTO from './create.lote.dto';
import Lote from './lote.entity';
export default class LoteService {
    private readonly loteRepo;
    private readonly inviteService;
    constructor(loteRepo: Repository<Lote>, inviteService: InviteService);
    create(barrio_id: string, loteDTO: CreateLoteDTO): Promise<boolean>;
    createInvite(lote_id: string, acc_id: string): Promise<SignedInvite>;
    associatePropietario(lote_id: string, barrio_id: string, session: JwtSession, device_id: string): Promise<boolean>;
    getAll(barrio_id: string): Promise<any[]>;
    delete(lote_id: string, barrio_id: string): Promise<import("typeorm").DeleteResult>;
}
