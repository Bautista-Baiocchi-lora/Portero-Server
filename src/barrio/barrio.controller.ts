import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { BarrioRegistrationDTO } from 'src/barrio/barrio.registration.dto';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import { BarrioService } from './barrio.service';

@Controller('barrio')
export default class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    return await this.barrioService.register(registerDTO);
  }

  @Get('/lotes/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async getBarrioLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.barrioService.getAllLotes(session);
  }
}
