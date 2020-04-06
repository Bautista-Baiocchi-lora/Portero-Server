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
const typeorm_1 = require("typeorm");
const lote_entity_1 = require("./lote.entity");
const typeorm_2 = require("@nestjs/typeorm");
let LoteService = class LoteService {
    constructor(loteRepo) {
        this.loteRepo = loteRepo;
    }
    async create(barrio_id, loteDTO) {
        return await this.loteRepo.query(insert_lote_query(barrio_id, loteDTO));
    }
    async getAll(barrio_id) {
        return await this.loteRepo.query(select_lotes_query(barrio_id));
    }
};
LoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(lote_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], LoteService);
exports.default = LoteService;
function select_lotes_query(barrio_id) {
    return `SELECT`;
}
function insert_lote_query(barrio_id, loteDTO) {
    const { name, street, code, num } = loteDTO;
    return `SELECT insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
}
//# sourceMappingURL=lote.service.js.map