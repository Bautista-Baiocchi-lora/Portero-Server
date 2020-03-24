"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const typeorm_1 = require("@nestjs/typeorm");
const authentication_controller_1 = require("./authentication.controller");
const jwt_service_1 = require("./jwt.service");
const session_service_1 = require("./session.service");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    common_1.Module({
        providers: [authentication_service_1.AuthenticationService, jwt_service_1.default, session_service_1.SessionService],
        controllers: [authentication_controller_1.AuthenticationController],
        imports: [typeorm_1.TypeOrmModule.forFeature()],
        exports: [jwt_service_1.default]
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map