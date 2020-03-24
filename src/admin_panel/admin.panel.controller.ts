import { Controller, Get, Post, Body, UseGuards, Header } from '@nestjs/common';
import {BarrioService} from '../barrio/barrio.service'
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { InsertResult } from 'typeorm';
import { SessionGuard } from 'src/authentication/session.guard';
import { Request } from 'express';
import Session from 'src/authentication/session.entity';
import { JwtToken } from 'src/authentication/jwt.service';

@Controller('admin')
export class AdminPanelController {
  constructor(private readonly barrioService: BarrioService) {}


  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
      return await this.barrioService.register(registerDTO);
  }

  @Get('new/invite')
  @UseGuards(SessionGuard)
  async getNewInvite(@JwtToken() token:string): Promise<any>{
    return await this.barrioService.getNewInvite(token)
   }

}
