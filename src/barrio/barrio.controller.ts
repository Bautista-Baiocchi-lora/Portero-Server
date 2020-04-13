import { Body, Controller, Post } from '@nestjs/common';
import { BarrioRegistrationDTO } from 'src/barrio/barrio.registration.dto';
import { BarrioService } from './barrio.service';

@Controller('barrio')
export default class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    return await this.barrioService.register(registerDTO);
  }
}
