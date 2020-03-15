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
const barrio_service_1 = require("../barrio/barrio.service");
const barrio_registration_dto_1 = require("./barrio.registration.dto");
const session_guard_1 = require("../authentication/session.guard");
let AdminPanelController = class AdminPanelController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async register(registerDTO) {
        return await this.adminService.register(registerDTO);
    }
    test() {
        return true;
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [barrio_registration_dto_1.BarrioRegistrationDTO]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "register", null);
__decorate([
    common_1.Get('private'),
    common_1.UseGuards(session_guard_1.SessionGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], AdminPanelController.prototype, "test", null);
AdminPanelController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [barrio_service_1.BarrioService])
], AdminPanelController);
exports.AdminPanelController = AdminPanelController;
//# sourceMappingURL=admin.panel.controller.js.map