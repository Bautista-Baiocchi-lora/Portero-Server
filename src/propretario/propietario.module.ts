import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Propietario from "./propietario.entity";
import PropietarioController from "./propietario.controller";
import PropietarioService from "./propietario.service";

@Module({
    imports:[TypeOrmModule.forFeature([Propietario])],
    controllers: [PropietarioController],
    providers: [PropietarioService]
})
export default class PropietarioModule{

}