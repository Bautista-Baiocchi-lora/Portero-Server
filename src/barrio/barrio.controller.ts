import { Controller, Post, Body, Get, UseGuards, UsePipes, Session } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import SessionGuard, { UserTypes } from "src/session/session.guard";
import { JwtSession } from "src/session/jwt.service";
import { UserType } from "src/authentication/user.type";


@Controller('barrio')
export default class BarrioController{

    constructor(private readonly barrioService:BarrioService){}

    @Post('register')
    async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean>{
      return await this.barrioService.register(registerDTO);
    }

    @Get('new/invite')
    @UseGuards(SessionGuard)
    @UserTypes(UserType.BARRIO)
    async getNewInvite(@Session() session:JwtSession): Promise<string>{
      return await this.barrioService.getNewInvite(session)
    }


}