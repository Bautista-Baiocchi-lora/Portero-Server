import { Module } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { Barrio } from "./barrio.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    providers:[BarrioService],
    imports:[TypeOrmModule.forFeature([Barrio])],
    exports: [BarrioService]
})
export class BarrioModule{}