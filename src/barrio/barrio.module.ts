import { Module } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { Barrio } from "./barrio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteModule } from "src/invite/invite.module";
import { AuthenticationModule } from "src/authentication/authentication.module";
import BarrioController from "./barrio.controller";
import { AuthenticationService } from "src/authentication/authentication.service";
import InviteService from "src/invite/invite.service";

@Module({
    providers:[BarrioService],
    controllers: [BarrioController],
    imports:[TypeOrmModule.forFeature([Barrio]), AuthenticationModule, InviteModule],
})
export class BarrioModule{}