import { Controller, Post, Body } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import { AuthenticationService, Cookie } from "./auth.service";

@Controller('auth')
export class AuthenticationController{

    constructor(private readonly authService:AuthenticationService){}

    @Post('login')
    async login(@Body() logInDTO: LogInDTO):Promise<Cookie>{
        return await this.authService.authenticate(logInDTO)
    }

}