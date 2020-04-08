import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { UserType } from 'src/authentication/user.type';
import { BarrioRegistrationDTO } from 'src/barrio/barrio.registration.dto';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { UserTypes } from 'src/session/session.guard';
import { BarrioService } from './barrio.service';

@Controller('barrio')
export default class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    return await this.barrioService.register(registerDTO);
  }

  @Get('new/invite')
  @UseGuards(SessionGuard)
  @UserTypes(UserType.BARRIO)
  async getNewInvite(@Session() session: JwtSession): Promise<string> {
    return await this.barrioService.getNewInvite(session);
  }
}
