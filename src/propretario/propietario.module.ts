import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PropietarioController from './propietario.controller';
import Propietario from './propietario.entity';
import PropietarioService from './propietario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Propietario])],
  controllers: [PropietarioController],
  providers: [PropietarioService],
})
export default class PropietarioModule {}
