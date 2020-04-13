import { Connection } from 'typeorm';
export default class InviteService {
    private readonly connection;
    constructor(connection: Connection);
    sign(invite: any): Promise<SignedInvite>;
}
export declare type SignedInvite = {
    invite: string;
    id: string;
};
