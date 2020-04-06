import { Module } from "@nestjs/common";
import LoteController from "./lote.controller";
import SessionModule from "src/session/session.module";
import LoteService from "./lote.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Lote from "./lote.entity";

@Module({
    controllers:[LoteController],
    providers:[LoteService],
    imports:[SessionModule, TypeOrmModule.forFeature([Lote])]
})
export default class LoteModule{

}