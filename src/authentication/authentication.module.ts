import { Module, createParamDecorator } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationController } from "./authentication.controller";
import { SessionService } from "./session.service";


@Module({
    providers: [AuthenticationService, SessionService],
    controllers: [AuthenticationController],
    imports:[TypeOrmModule.forFeature()],
    exports:[AuthenticationService]
})
export class AuthenticationModule{

}

export const UserSession = createParamDecorator(
    (data: unknown, ctx) => {
         return ctx.headers['authorization']
    }
)