"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_error_1 = require("../authentication/auth.error");
const user_type_1 = require("../authentication/user.type");
const settings = require("../server-config.json");
const jwt_service_1 = require("./jwt.service");
const session_service_1 = require("./session.service");
let SessionGuard = class SessionGuard {
    constructor(jwtService, reflector, sessionService) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.sessionService = sessionService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const hasAuthHeader = Object.keys(request.headers).includes('authorization');
        if (hasAuthHeader) {
            const jwt = request.headers.authorization;
            const session = await this.jwtService.verify(jwt, settings.jwt.session_secret);
            if (session) {
                const dbValidated = await this.sessionService.verify(session.session_id, session.acc_id, session.device_id);
                if (dbValidated) {
                    request.session = session;
                    const userType = this.reflector.get('userType', context.getHandler());
                    return userType ? userType.includes(session.type) : true;
                }
                return false;
            }
        }
        throw new auth_error_1.AuthenticationError();
    }
};
SessionGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        core_1.Reflector,
        session_service_1.SessionService])
], SessionGuard);
exports.default = SessionGuard;
exports.UserTypes = (...type) => common_1.SetMetadata('userType', type);
//# sourceMappingURL=session.guard.js.map