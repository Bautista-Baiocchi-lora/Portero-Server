import { Body, Controller, Post, Session } from '@nestjs/common';
import { AccountType } from 'src/authentication/account.type';
import { JwtSession } from 'src/session/jwt.service';
import { AccountTypes } from 'src/session/session.guard';
import { GuardiaRegistrationDTO } from './guardia.registration.dto';
import GuardiaService from './guardia.service';

@Controller('guardia')
export default class GuardiaController {
  constructor(private readonly guardiaService: GuardiaService) {}

  @Post('register')
  @AccountTypes(AccountType.USER)
  async register(
    @Session() session: JwtSession,
    @Body() registerDTO: GuardiaRegistrationDTO,
  ): Promise<boolean> {
    return await this.guardiaService.register(session, registerDTO);
  }
}
