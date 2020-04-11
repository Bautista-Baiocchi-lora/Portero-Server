import { Repository } from 'typeorm';
import BarrioInvite from './barrio.invite.entity';
export default class InviteService {
    private readonly barrioInviteRepo;
    constructor(barrioInviteRepo: Repository<BarrioInvite>);
    createBarrioInvite(barrio_id: string): Promise<string>;
}
