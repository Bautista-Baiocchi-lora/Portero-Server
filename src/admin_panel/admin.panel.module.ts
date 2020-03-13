import { Module } from "@nestjs/common";
import { AdminPanelController } from "./admin.panel.controller";
import { BarrioModule } from "../barrio/barrio.module";


@Module({
    controllers: [AdminPanelController],
    imports:[BarrioModule]
})
export class AdminPanelModule{}