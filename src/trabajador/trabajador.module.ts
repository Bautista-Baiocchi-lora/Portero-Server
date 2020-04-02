import { AuthenticationModule } from "src/authentication/authentication.module";
import Trabajador from "./trabajador.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import TrabajadorController from "./trabajador.controller";
import TrabajadorService from "./trabajador.service";

@Module({
    imports:[TypeOrmModule.forFeature([Trabajador]), AuthenticationModule],
    controllers: [TrabajadorController],
    providers:[TrabajadorService]
})
export default class TrabajadorModule{}