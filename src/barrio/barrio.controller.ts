import { Body, Controller, Get, Post, Put, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { BarrioRegistrationDTO } from 'src/barrio/barrio.registration.dto';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import { BarrioService } from './barrio.service';
import { DisableGuardiaDTO } from './disable.guardia.dto';
import { DisablePropietarioDTO } from './disable.propietario.dto';

@Controller('barrio')
export default class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    return await this.barrioService.register(registerDTO);
  }

  @Get('/guardias/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async getBarrioGuardias(@Session() session: JwtSession): Promise<any[]> {
    return await this.barrioService.getAllGuardias(session);
  }

  @Get('/lotes/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async getBarrioLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.barrioService.getAllLotes(session);
  }

  @Put('/propietario/disable')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async disablePropietario(
    @Session() session: JwtSession,
    @Body() disableDTO: DisablePropietarioDTO,
  ): Promise<boolean> {
    return await this.barrioService.disablePropietario(session, disableDTO);
  }

  @Put('/guardia/disable')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.BARRIO)
  async disableGuardia(
    @Session() session: JwtSession,
    @Body() disableDTO: DisableGuardiaDTO,
  ): Promise<boolean> {
    return await this.barrioService.disableGuardia(session, disableDTO);
  }
}
