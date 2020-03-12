import { Module } from "@nestjs/common";
import { AdminPanelService } from "./admin.panel.service";
import { AdminPanelController } from "./admin.panel.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Barrio from "./barrio.entity";


@Module({
    providers:[AdminPanelService],
    controllers: [AdminPanelController],
    imports:[TypeOrmModule.forFeature([Barrio])]
})
export class AdminPanelModule{}