import { Module, createParamDecorator } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionService } from "./session.service";
import Session from "./session.entity";


@Module({
    providers: [AuthenticationService, SessionService],
    imports:[TypeOrmModule.forFeature([Session])],
    exports:[AuthenticationService]
})
export class AuthenticationModule{}

export const UserSession = createParamDecorator(
    (data: unknown, ctx) => {
         return ctx.headers['authorization']
    }
)