import { Controller, Post, Body, Get, UseGuards, UsePipes } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import { SessionGuard } from "src/session/session.guard";
import { JwtValidationPipe } from "src/session/jwt.validation.pipe";
import { UserSession } from "src/authentication/auth.module";
import Session from "src/session/session.entity";
import BarrioGuard from "src/authentication/barrio.guard";
import { JwtSession } from "src/session/jwt.service";


@Controller('barrio')
export default class BarrioController{

    constructor(private readonly barrioService:BarrioService){}

    @Post('register')
    async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean>{
      return await this.barrioService.register(registerDTO);
    }

    @Get('new/invite')
    @UseGuards(BarrioGuard)
    @UsePipes(JwtValidationPipe)
    async getNewInvite(@UserSession() session:JwtSession): Promise<string>{
      return await this.barrioService.getNewInvite(session)
    }


}