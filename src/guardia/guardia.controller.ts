import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import SessionGuard, { AccountTypes } from 'src/session/session.guard';
import { GuardiaRegistrationDTO } from './guardia.registration.dto';
import GuardiaService from './guardia.service';

@Controller('guardia')
export default class GuardiaController {
  constructor(private readonly guardiaService: GuardiaService) {}

  @Post('register')
  @AccountTypes(AccountType.USER)
  @UseGuards(SessionGuard)
  async register(
    @Session() session: JwtSession,
    @Body() registerDTO: GuardiaRegistrationDTO,
  ): Promise<boolean> {
    return await this.guardiaService.register(session, registerDTO);
  }
}
