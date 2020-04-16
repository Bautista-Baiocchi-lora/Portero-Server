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
const associate_propietario_dto_1 = require("./associate.propietario.dto");
const create_lote_dto_1 = require("./create.lote.dto");
const lote_service_1 = require("./lote.service");
let LoteController = class LoteController {
    constructor(loteService) {
        this.loteService = loteService;
    }
    async create(session, createDTO) {
        return await this.loteService.create(session.acc_id, createDTO);
    }
    async deleteLote(lote_id, session) {
        return await this.loteService.delete(lote_id, session.acc_id);
    }
    async getBarrioLotes(session) {
        return await this.loteService.getAllLotesAndPropietariosInBarrio(session.acc_id);
    }
    async getPropietarioLotes(session) {
        return await this.loteService.getAllLotesOfPropietario(session);
    }
    async associatePropietario(associateDTO, session) {
        return await this.loteService.associatePropietario(associateDTO, session);
    }
};
__decorate([
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.BARRIO),
    common_1.Post('new'),
    __param(0, common_1.Session()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lote_dto_1.default]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "create", null);
__decorate([
    common_1.Delete('delete'),
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.BARRIO),
    __param(0, common_1.Query('lote')), __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "deleteLote", null);
__decorate([
    common_1.Get('barrio/all'),
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.BARRIO),
    __param(0, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "getBarrioLotes", null);
__decorate([
    common_1.Get('propietario/all'),
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.PROPIETARIO),
    __param(0, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "getPropietarioLotes", null);
__decorate([
    common_1.Post('associate'),
    common_1.UseGuards(session_guard_1.default),
    session_guard_1.UserTypes(user_type_1.UserType.PROPIETARIO),
    __param(0, common_1.Body()),
    __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associate_propietario_dto_1.AssociatePropietarioDTO, Object]),
    __metadata("design:returntype", Promise)
], LoteController.prototype, "associatePropietario", null);
LoteController = __decorate([
    common_1.Controller('lote'),
    __metadata("design:paramtypes", [lote_service_1.default])
], LoteController);
exports.default = LoteController;
//# sourceMappingURL=lote.controller.js.map