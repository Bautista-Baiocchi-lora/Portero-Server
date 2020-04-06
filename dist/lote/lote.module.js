"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lote_controller_1 = require("./lote.controller");
const session_module_1 = require("../session/session.module");
const lote_service_1 = require("./lote.service");
const typeorm_1 = require("@nestjs/typeorm");
const lote_entity_1 = require("./lote.entity");
let LoteModule = class LoteModule {
};
LoteModule = __decorate([
    common_1.Module({
        controllers: [lote_controller_1.default],
        providers: [lote_service_1.default],
        imports: [session_module_1.default, typeorm_1.TypeOrmModule.forFeature([lote_entity_1.default])]
    })
], LoteModule);
exports.default = LoteModule;
//# sourceMappingURL=lote.module.js.map