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
const barrio_service_1 = require("./barrio.service");
const barrio_registration_dto_1 = require("./barrio.registration.dto");
const session_guard_1 = require("../authentication/session.guard");
const jwt_validation_pipe_1 = require("../authentication/jwt.validation.pipe");
const authentication_module_1 = require("../authentication/authentication.module");
const session_entity_1 = require("../authentication/session.entity");
const log_in_dto_1 = require("../authentication/log.in.dto");
const cookie_1 = require("../authentication/cookie");
let BarrioController = class BarrioController {
    constructor(barrioService) {
        this.barrioService = barrioService;
    }
    async register(registerDTO) {
        return await this.barrioService.register(registerDTO);
    }
    async login(logInDTO) {
        return await this.barrioService.authenticate(logInDTO);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [barrio_registration_dto_1.BarrioRegistrationDTO]),
    __metadata("design:returntype", Promise)
], BarrioController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_in_dto_1.LogInDTO]),
    __metadata("design:returntype", Promise)
], BarrioController.prototype, "login", null);
BarrioController = __decorate([
    common_1.Controller('barrio'),
    __metadata("design:paramtypes", [barrio_service_1.BarrioService])
], BarrioController);
exports.default = BarrioController;
//# sourceMappingURL=barrio.controller.js.map