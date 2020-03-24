import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BarrioInvite from "./barrio.invite.entity";
import { Repository } from "typeorm";

@Injectable()
export default class InviteService{

    constructor(@InjectRepository(BarrioInvite) private readonly barrioInviteRepo: Repository<BarrioInvite> ){}


} 