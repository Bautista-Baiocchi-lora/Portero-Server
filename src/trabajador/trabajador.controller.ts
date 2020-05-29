import { Controller } from '@nestjs/common';
import TrabajadorService from './trabajador.service';

@Controller('trabajador')
export default class TrabajadorController {
  constructor(private readonly trabajadorService: TrabajadorService) {}
}
