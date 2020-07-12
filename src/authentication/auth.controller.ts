import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService, AuthResponse } from './auth.service';
import { LogInDTO } from './log.in.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() logInDTO: LogInDTO): Promise<AuthResponse> {
    return await this.authService.authenticate(logInDTO);
  }
}
