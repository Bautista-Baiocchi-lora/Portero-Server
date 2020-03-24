import { Module } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { Barrio } from "./barrio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteModule } from "src/invite/invite.module";

@Module({
    providers:[BarrioService],
    imports:[TypeOrmModule.forFeature([Barrio]), InviteModule],
    exports: [BarrioService]
})
export class BarrioModule{}