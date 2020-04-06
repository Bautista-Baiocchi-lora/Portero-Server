import { Controller, UseGuards, UsePipes, Post, Body, Get, Session } from "@nestjs/common";
import LoteService from "./lote.service";
import CreateLoteDTO from "./create.lote.dto";
import { JwtSession } from "src/session/jwt.service";
import SessionGuard, {UserTypes } from "src/session/session.guard";
import Barrio from "src/barrio/barrio.entity";
import { UserType } from "src/authentication/user.type";

@Controller('lote')
export default class LoteController{

    constructor(private readonly loteService:LoteService){}

    @UseGuards(SessionGuard)
    @UserTypes(UserType.BARRIO)
    @Post('new')
    async create(@Session() session:JwtSession, @Body() createDTO: CreateLoteDTO){
        return await this.loteService.create(session.account_id, createDTO);
    }

    @Get('all')
    @UseGuards(SessionGuard)
    @UserTypes(UserType.BARRIO)
    async getAllLotes(@Session() session: JwtSession){
        return await this.loteService.getAll(session.account_id)
    }


}
