"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const barrio_invite_entity_1 = require("./barrio.invite.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invite_service_1 = require("./invite.service");
const invite_controller_1 = require("./invite.controller");
const authentication_module_1 = require("../authentication/authentication.module");
let InviteModule = class InviteModule {
};
InviteModule = __decorate([
    common_1.Module({
        providers: [invite_service_1.default],
        controllers: [invite_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([barrio_invite_entity_1.default]), authentication_module_1.AuthenticationModule],
        exports: [invite_service_1.default]
    })
], InviteModule);
exports.InviteModule = InviteModule;
//# sourceMappingURL=invite.module.js.map