import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Propietario from "./propietario.entity";
import PropietarioController from "./propietario.controller";
import PropietarioService from "./propietario.service";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
    imports:[TypeOrmModule.forFeature([Propietario]), AuthenticationModule],
    controllers: [PropietarioController],
    providers: [PropietarioService]
})
export default class PropietarioModule{

}