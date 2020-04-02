import { Controller, Post, Body, Get, UseGuards, UsePipes } from "@nestjs/common";
import { BarrioService } from "./barrio.service";
import { BarrioRegistrationDTO } from "src/barrio/barrio.registration.dto";
import { SessionGuard } from "src/authentication/session.guard";
import { JwtValidationPipe } from "src/authentication/jwt.validation.pipe";
import { UserSession } from "src/authentication/authentication.module";
import Session from "src/authentication/session.entity";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";


@Controller('barrio')
export default class BarrioController{

    constructor(private readonly barrioService:BarrioService){}

    @Post('register')
    async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean>{
      return await this.barrioService.register(registerDTO);
    }



  @Post('login')
  async login(@Body() logInDTO: LogInDTO):Promise<Cookie>{
    return await this.barrioService.authenticate(logInDTO)
  }


}