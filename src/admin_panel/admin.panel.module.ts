import { Module } from "@nestjs/common";
import { AdminPanelService } from "./admin.panel.service";
import { AdminPanelController } from "./admin.panel.controller";
import { BarrioRepository } from "./barrio.repo";


@Module({
    providers:[AdminPanelService, BarrioRepository],
    controllers: [AdminPanelController]
})
export class AdminPanelModule{}