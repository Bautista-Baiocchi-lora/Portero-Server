"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("../authentication/auth.module");
const trabajador_entity_1 = require("./trabajador.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const trabajador_controller_1 = require("./trabajador.controller");
const trabajador_service_1 = require("./trabajador.service");
let TrabajadorModule = class TrabajadorModule {
};
TrabajadorModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([trabajador_entity_1.default])],
        controllers: [trabajador_controller_1.default],
        providers: [trabajador_service_1.default]
    })
], TrabajadorModule);
exports.default = TrabajadorModule;
//# sourceMappingURL=trabajador.module.js.map