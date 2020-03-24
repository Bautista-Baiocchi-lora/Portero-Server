import BarrioInvite from "./barrio.invite.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import InviteService from "./invite.service";
import InviteController from "./invite.controller";
import { AuthenticationModule } from "src/authentication/authentication.module";


@Module({
    providers:[InviteService],
    controllers: [InviteController],
    imports:[TypeOrmModule.forFeature([BarrioInvite]), AuthenticationModule],
    exports: [InviteService]
})
export class InviteModule{


} 