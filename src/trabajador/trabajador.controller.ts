import { Body, Controller, Post } from '@nestjs/common';
import TrabajadorRegistrationDTO from './trabajador.registration.dto';
import TrabajadorService from './trabajador.service';

@Controller('trabajador')
export default class TrabajadorController {
  constructor(private readonly trabajadorService: TrabajadorService) {}

  @Post('register')
  async register(@Body() registerDTO: TrabajadorRegistrationDTO): Promise<boolean> {
    return await this.trabajadorService.register(registerDTO);
  }
}
