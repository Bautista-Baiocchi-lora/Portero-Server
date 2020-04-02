import { Controller, Post, Body } from "@nestjs/common";
import PropietarioRegistrationDTO from "./propietario.registration.dto";
import PropietarioService from "./propietario.service";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";

@Controller('propietario')
export default class PropietarioController{

    constructor(private readonly propietarioService:PropietarioService){}

    @Post('register')
    async register(@Body() registerDTO:PropietarioRegistrationDTO): Promise<boolean>{
        return await this.propietarioService.register(registerDTO);
    }

    @Post('login')
    async login(@Body() logInDTo: LogInDTO):Promise<Cookie>{
        return await this.propietarioService.authenticate(logInDTo);
    }

}