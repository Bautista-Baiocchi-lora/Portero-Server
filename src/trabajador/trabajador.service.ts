import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Trabajador from './trabajador.entity';

@Injectable()
export default class TrabajadorService {
  constructor(
    @InjectRepository(Trabajador) private readonly trabajadorRepo: Repository<Trabajador>,
  ) {}
}
