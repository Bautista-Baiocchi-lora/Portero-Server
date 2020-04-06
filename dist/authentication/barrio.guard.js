"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_error_1 = require("./auth.error");
const jwt_service_1 = require("../session/jwt.service");
const session_guard_1 = require("../session/session.guard");
let BarrioGuard = class BarrioGuard extends session_guard_1.SessionGuard {
    async canActivate(context) {
        const authenticated = await super.canActivate(context);
        if (authenticated) {
            return context.switchToHttp().getRequest().session.type === BARRIO_TYPE;
        }
        throw new auth_error_1.AuthenticationError();
    }
};
BarrioGuard = __decorate([
    common_1.Injectable()
], BarrioGuard);
exports.default = BarrioGuard;
const BARRIO_TYPE = 0;
//# sourceMappingURL=barrio.guard.js.map