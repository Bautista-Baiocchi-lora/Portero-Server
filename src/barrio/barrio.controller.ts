import { Body, Controller, Post } from '@nestjs/common';
import BarrioRegistrationDTO from './barrio.register.dto';
import BarrioService from './barrio.service';

@Controller('barrio')
export default class BarrioController {
  constructor(private readonly adminService: BarrioService) {}

  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<boolean> {
    return await null;
  }
}
