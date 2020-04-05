import { Module } from "@nestjs/common";
import LoteController from "./lote.controller";
import SessionModule from "src/session/session.module";
import LoteService from "./lote.service";

@Module({
    controllers:[LoteController],
    providers:[LoteService],
    imports:[SessionModule]
})
export default class LoteModule{

}