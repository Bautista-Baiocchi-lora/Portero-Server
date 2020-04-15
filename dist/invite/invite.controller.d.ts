import { JwtSession } from 'src/session/jwt.service';
import InviteService, { SignedInvite } from './invite.service';
export default class InviteController {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    newLoteInvite(lote_id: string, session: JwtSession): Promise<SignedInvite>;
}
