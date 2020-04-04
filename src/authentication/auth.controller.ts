import { Controller, Post, Body } from "@nestjs/common";
import { LogInDTO } from "./log.in.dto";
import { AuthenticationService } from "./auth.service";

@Controller('auth')
export class AuthenticationController{

    constructor(private readonly authService:AuthenticationService){}

    @Post('login')
    async login(@Body() logInDTo: LogInDTO):Promise<string>{
        return await this.authService.authenticate(logInDTo)
    }

}