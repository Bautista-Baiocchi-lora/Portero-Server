import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService, Cookie } from './auth.service';
import { LogInDTO } from './log.in.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() logInDTO: LogInDTO): Promise<Cookie> {
    return await this.authService.authenticate(logInDTO);
  }
}
