import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationController } from "./authentication.controller";
import { JwtService } from "./jwt.service";
import { SessionGuard } from "./session.guard";


@Module({
    providers: [AuthenticationService, JwtService],
    controllers: [AuthenticationController],
    imports:[TypeOrmModule.forFeature()],
    exports:[JwtService]
})
export class AuthenticationModule{

}