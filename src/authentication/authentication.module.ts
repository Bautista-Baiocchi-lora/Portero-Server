import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationController } from "./authentication.controller";


@Module({
    providers: [AuthenticationService],
    controllers: [AuthenticationController],
    imports:[TypeOrmModule.forFeature()]
})
export class AuthenticationModule{

}