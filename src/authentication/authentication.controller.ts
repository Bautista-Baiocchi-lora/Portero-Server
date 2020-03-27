import { Controller, Post, Body, UseGuards, UsePipes } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./authentication.service";
import { SessionGuard } from "./session.guard";
import { UserSession } from 'src/authentication/authentication.module';
import { JwtValidationPipe } from "./jwt.validation.pipe";
import Session from "./session.entity";

@Controller('auth')
export class AuthenticationController{

    constructor(private readonly authService:AuthenticationService){}

  @Post('login')
  async authenticate(@Body() logInDTO: LogInDTO):Promise<string>{
    return await this.authService.authenticate(logInDTO)
  }

}