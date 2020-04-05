import BarrioInvite from "./barrio.invite.entity";
import { Repository } from "typeorm";
export default class InviteService {
    private readonly barrioInviteRepo;
    constructor(barrioInviteRepo: Repository<BarrioInvite>);
    createBarrioInvite(barrio_id: string): Promise<string>;
}
