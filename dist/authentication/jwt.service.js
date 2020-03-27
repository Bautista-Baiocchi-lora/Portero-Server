"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require('jsonwebtoken');
const secret = "our super secret";
let JwtService = class JwtService {
    async sign(session) {
        return await jwt.sign(session, secret);
    }
    async verify(token) {
        return await jwt.verify(token, secret);
    }
    async decode(token) {
        return await jwt.decode(token);
    }
};
JwtService = __decorate([
    common_1.Injectable()
], JwtService);
exports.default = JwtService;
exports.JWT = common_1.createParamDecorator((data, ctx) => {
    return ctx.headers['authorization'];
});
//# sourceMappingURL=jwt.service.js.map