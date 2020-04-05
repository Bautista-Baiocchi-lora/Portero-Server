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
const session_guard_1 = require("../session/session.guard");
const jwt_validation_pipe_1 = require("../session/jwt.validation.pipe");
const lote_service_1 = require("./lote.service");
const create_lote_dto_1 = require("./create.lote.dto");
const auth_module_1 = require("../authentication/auth.module");
const barrio_entity_1 = require("../barrio/barrio.entity");
const barrio_guard_1 = require("../authentication/barrio.guard");
const jwt_service_1 = require("../session/jwt.service");
let LoteController = class LoteController {
    constructor(loteService) {
        this.loteService = loteService;
    }
    async create(createDTO, session) {
        return await this.loteService.create(session.account_id, createDTO);
    }
};
__decorate([
    common_1.UseGuards(barrio_guard_1.default),
    common_1.UsePipes(jwt_validation_pipe_1.JwtValidationPipe),
    common_1.Post('/new'),
    __param(0, common_1.Body()), __param(1, auth_module_1.UserSession()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lote_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "create", null);
LoteController = __decorate([
    common_1.Controller('lote'),
    __metadata("design:paramtypes", [lote_service_1.default])
], LoteController);
exports.default = LoteController;
//# sourceMappingURL=lote.controller.js.map