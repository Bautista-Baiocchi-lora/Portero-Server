import { Body, Controller, Post } from '@nestjs/common';
import AuthenticationService from './auth.service';
import LogInDTO from './log.in.dto';

@Controller('auth')
export default class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async logIn(@Body() logInDTO: LogInDTO) {
    return await this.authService.authenticate(logInDTO);
  }
}
