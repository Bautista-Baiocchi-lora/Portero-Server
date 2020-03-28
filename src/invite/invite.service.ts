import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BarrioInvite from "./barrio.invite.entity";
import { Repository } from "typeorm";

const mins_till_exp = 2;

@Injectable()
export default class InviteService{

    constructor(@InjectRepository(BarrioInvite) private readonly barrioInviteRepo: Repository<BarrioInvite> ){}


    async createBarrioInvite(barrio_id:number): Promise<string>{
        return await this.barrioInviteRepo.query(create_barrio_invite_query(barrio_id))
        .then(parse_create_barrio_query)
    }

} 

function parse_create_barrio_query(response):string{
    return response[0].create_barrio_invite
}

function create_barrio_invite_query(barrio_id:number): string{
    return `SELECT create_barrio_invite('${barrio_id}');`
}