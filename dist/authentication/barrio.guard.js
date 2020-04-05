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
const auth_error_1 = require("./auth.error");
const jwt_service_1 = require("../session/jwt.service");
let BarrioGuard = class BarrioGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const headers = context.switchToHttp().getRequest().headers;
        const hasAuthHeader = Object.keys(headers).includes('authorization');
        if (hasAuthHeader) {
            const jwt = headers.authorization;
            const validated = await this.jwtService.verifyJWT(jwt);
            if (validated) {
                const session = await this.jwtService.decodeJWT(jwt);
                return session.type === BARRIO_TYPE;
            }
        }
        throw new auth_error_1.AuthenticationError();
    }
};
BarrioGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], BarrioGuard);
exports.default = BarrioGuard;
const BARRIO_TYPE = 0;
//# sourceMappingURL=barrio.guard.js.map