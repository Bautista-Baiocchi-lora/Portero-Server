import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrabajadorController from './trabajador.controller';
import Trabajador from './trabajador.entity';
import TrabajadorService from './trabajador.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trabajador])],
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
})
export default class TrabajadorModule {}
