import { Module, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionService } from "../session/session.service";
import Session from "../session/session.entity";
import SessionModule from "src/session/session.module";
import { AuthenticationController } from "./auth.controller";


@Module({
    controllers:[AuthenticationController],
    providers: [AuthenticationService],
    exports:[AuthenticationService],
    imports:[SessionModule]
})
export class AuthenticationModule{}

