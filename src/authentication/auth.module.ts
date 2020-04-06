import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import SessionModule from "src/session/session.module";
import { AuthenticationController } from "./auth.controller";


@Module({
    controllers:[AuthenticationController],
    providers: [AuthenticationService],
    exports:[AuthenticationService],
    imports:[SessionModule]
})
export class AuthenticationModule{}


