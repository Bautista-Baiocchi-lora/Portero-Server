import { Module } from "@nestjs/common";
import { AdminPanelController } from "./admin.panel.controller";
import { BarrioModule } from "../barrio/barrio.module";
import { AuthenticationModule } from "src/authentication/authentication.module";


@Module({
    controllers: [AdminPanelController],
    imports:[BarrioModule, AuthenticationModule],
})
export class AdminPanelModule{}