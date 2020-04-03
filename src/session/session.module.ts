import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Session from './session.entity'
import { SessionService } from "./session.service";
import { JwtService } from "./jwt.service";

@Module({
    providers:[SessionService, JwtService],
    imports:[TypeOrmModule.forFeature([Session])],
    exports:[SessionService, JwtService]
})
export default class SessionModule{

}