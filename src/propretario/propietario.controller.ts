import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import { PropietarioRegistrationDTO } from './propietario.registration.dto';
import PropietarioService from './propietario.service';

@Controller('propietario')
export default class PropietarioController {
  constructor(private readonly propietarioService: PropietarioService) {}

  @Get('/lotes/all')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.PROPIETARIO)
  async getAllLotes(@Session() session: JwtSession): Promise<any[]> {
    return await this.propietarioService.getAllLotes(session);
  }

  @Post('register')
  @UseGuards(SessionGuard)
  @AccountTypes(AccountType.USER, AccountType.PROPIETARIO)
  async associatePropietario(
    @Body() registerDTO: PropietarioRegistrationDTO,
    @Session() session: JwtSession,
  ): Promise<boolean> {
    return await this.propietarioService.register(registerDTO, session);
  }
}
