"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_entity_1 = require("./session.entity");
const session_service_1 = require("./session.service");
const jwt_service_1 = require("./jwt.service");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    common_1.Module({
        providers: [session_service_1.SessionService, jwt_service_1.JwtService],
        imports: [typeorm_1.TypeOrmModule.forFeature([session_entity_1.default])],
        exports: [session_service_1.SessionService, jwt_service_1.JwtService]
    })
], SessionModule);
exports.default = SessionModule;
//# sourceMappingURL=session.module.js.map