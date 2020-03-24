import { Module } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { Barrio } from "./barrio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteModule } from "src/invite/invite.module";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
    providers:[BarrioService],
    imports:[TypeOrmModule.forFeature([Barrio]), InviteModule, AuthenticationModule],
    exports: [BarrioService]
})
export class BarrioModule{}