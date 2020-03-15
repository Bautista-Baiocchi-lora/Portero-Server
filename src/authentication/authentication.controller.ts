import { Controller, Post, Inject, Body, Req, Res, UseGuards } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./authentication.service";
import { Request, Response } from "express";
import { SessionGuard } from "./session.guard";
import {Session} from '@nestjs/common'

@Controller('auth')
export class AuthenticationController{

    constructor(private readonly authService:AuthenticationService){}

  @Post('login')
  async authenticate(@Body() logInDTO: LogInDTO):Promise<any>{
    return await this.authService.authenticate(logInDTO)
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  async logOut(@Session() session){
    return await this.authService.logOut(session)
  }

}