import { Controller, Post, Inject, Body } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./authentication.service";

@Controller('auth')
export class AuthenticationController{

    constructor(private readonly authService:AuthenticationService){}

  @Post('barrio')
  async authenticateBarrio(@Body() logInDTO: LogInDTO){
    return await this.authService.authenticate(logInDTO)
  }

}