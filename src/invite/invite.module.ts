import BarrioInvite from "./barrio.invite.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import InviteService from "./invite.service";


@Module({
    providers:[InviteService],
    imports:[TypeOrmModule.forFeature([BarrioInvite])],
    exports: [InviteService]
})
export class InviteModule{


}