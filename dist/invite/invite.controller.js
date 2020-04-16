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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_type_1 = require("../authentication/user.type");
const jwt_service_1 = require("../session/jwt.service");
const session_guard_1 = require("../session/session.guard");
const invite_service_1 = require("./invite.service");
let InviteController = class InviteController {
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    async newLoteInvite(lote_id, session) {
        return await this.inviteService.createLoteInvite(lote_id, session.acc_id);
    }
};
__decorate([
    common_1.Post('prop/to/lote'),
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.BARRIO),
    __param(0, common_1.Query('lote')),
    __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "newLoteInvite", null);
InviteController = __decorate([
    common_1.Controller('invite'),
    __metadata("design:paramtypes", [invite_service_1.default])
], InviteController);
exports.default = InviteController;
//# sourceMappingURL=invite.controller.js.map