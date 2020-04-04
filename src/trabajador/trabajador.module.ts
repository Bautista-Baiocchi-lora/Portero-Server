import { AuthenticationModule } from "src/authentication/auth.module";
import Trabajador from "./trabajador.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import TrabajadorController from "./trabajador.controller";
import TrabajadorService from "./trabajador.service";

@Module({
    imports:[TypeOrmModule.forFeature([Trabajador])],
    controllers: [TrabajadorController],
    providers:[TrabajadorService]
})
export default class TrabajadorModule{}