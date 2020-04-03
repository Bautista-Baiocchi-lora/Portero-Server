import { Module } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { Barrio } from "./barrio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteModule } from "src/invite/invite.module";
import { AuthenticationModule } from "src/authentication/auth.module";
import BarrioController from "./barrio.controller";
import { AuthenticationService } from "src/authentication/auth.service";
import InviteService from "src/invite/invite.service";
import SessionModule from "src/session/session.module";

@Module({
    providers:[BarrioService],
    controllers: [BarrioController],
    imports:[TypeOrmModule.forFeature([Barrio]), InviteModule, SessionModule],
})
export class BarrioModule{}