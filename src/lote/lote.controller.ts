import { Controller, UseGuards, UsePipes, Post, Body } from "@nestjs/common";
import { SessionGuard } from "src/session/session.guard";
import { JwtValidationPipe } from "src/session/jwt.validation.pipe";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import LoteService from "./lote.service";
import CreateLoteDTO from "./create.lote.dto";
import { UserSession } from "src/authentication/auth.module";
import { Barrio } from "src/barrio/barrio.entity";
import BarrioGuard from "src/authentication/barrio.guard";
import { JwtSession } from "src/session/jwt.service";

@Controller('lote')
export default class LoteController{

    constructor(private readonly loteService:LoteService){}

    @UseGuards(BarrioGuard)
    @UsePipes(JwtValidationPipe)
    @Post('/new')
    async create(@Body() createDTO: CreateLoteDTO, @UserSession() session:JwtSession){
        return await this.loteService.create(session.account_id, createDTO);
    }

}
