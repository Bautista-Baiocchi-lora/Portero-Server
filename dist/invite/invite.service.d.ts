import { Connection } from 'typeorm';
export default class InviteService {
    private readonly connection;
    constructor(connection: Connection);
    private sign;
    createLoteInvite(lote_id: string, barrio_id: string): Promise<SignedInvite>;
    decode(signedInvite: string, invite_id: string): Promise<any>;
}
export declare type SignedInvite = {
    invite: string;
    id: string;
};
