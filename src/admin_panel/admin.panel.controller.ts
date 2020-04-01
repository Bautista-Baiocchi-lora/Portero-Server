import { Controller, Get, Post, Body, UseGuards, Header, UsePipes } from '@nestjs/common';
import {BarrioService} from '../barrio/barrio.service'
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { InsertResult } from 'typeorm';
import { SessionGuard } from 'src/authentication/session.guard';
import Session from 'src/authentication/session.entity';
import { JwtValidationPipe } from 'src/authentication/jwt.validation.pipe';
import { UserSession } from 'src/authentication/authentication.module';

@Controller('admin')
export class AdminPanelController {
  constructor(private readonly barrioService: BarrioService) {}


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
