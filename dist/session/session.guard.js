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
const session_service_1 = require("./session.service");
const jwt_service_1 = require("./jwt.service");
let SessionGuard = class SessionGuard {
    constructor(sessionService, jwtService) {
        this.sessionService = sessionService;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const headers = context.switchToHttp().getRequest().headers;
        const hasAuthHeader = Object.keys(headers).includes('authorization');
        if (hasAuthHeader) {
            const jwt = headers.authorization;
            const validToken = await this.jwtService.verifyJWT(jwt);
            if (validToken) {
                const session = await this.jwtService.decodeJWT(jwt);
                return await this.sessionService.verify(session);
            }
        }
        return false;
    }
};
SessionGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        jwt_service_1.JwtService])
], SessionGuard);
exports.SessionGuard = SessionGuard;
//# sourceMappingURL=session.guard.js.map