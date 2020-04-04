import { Controller, Post, Body, Get, UseGuards, UsePipes } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import { SessionGuard } from "src/session/session.guard";
import { JwtValidationPipe } from "src/session/jwt.validation.pipe";
import { UserSession } from "src/authentication/auth.module";
import Session from "src/session/session.entity";


@Controller('barrio')
export default class BarrioController{

    constructor(private readonly barrioService:BarrioService){}

    @Post('register')
    async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean>{
      return await this.barrioService.register(registerDTO);
    }

    @Get('new/invite')
    @UseGuards(SessionGuard)
    @UsePipes(JwtValidationPipe)
    async getNewInvite(@UserSession() session:Session): Promise<string>{
      return await this.barrioService.getNewInvite(session)
    }


}