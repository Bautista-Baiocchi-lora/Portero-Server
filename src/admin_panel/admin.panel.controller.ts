import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {BarrioService} from '../barrio/barrio.service'
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { InsertResult } from 'typeorm';
import { SessionGuard } from 'src/authentication/session.guard';

@Controller('admin')
export class AdminPanelController {
  constructor(private readonly adminService: BarrioService) {}


  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
      return await this.adminService.register(registerDTO);
  }

  @Get('private')
  @UseGuards(SessionGuard)
   test(): boolean{
    return true
   }

}
