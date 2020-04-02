import { Controller, Post, Body } from "@nestjs/common";
import TrabajadorRegistrationDTO from "./trabajador.registration.dto";
import { LogInDTO } from "src/authentication/log.in.dto";
import Cookie from "src/authentication/cookie";
import TrabajadorService from "./trabajador.service";


@Controller('trabajador')
export default class TrabajadorController{

    constructor(private readonly trabajadorService: TrabajadorService){}

    @Post('register')
    async register(@Body() registerDTO:TrabajadorRegistrationDTO): Promise<boolean>{
        return await this.trabajadorService.register(registerDTO);
    }

    @Post('login')
    async login(@Body() logInDTo: LogInDTO):Promise<Cookie>{
        return await this.trabajadorService.authenticate(logInDTo)
    }
}