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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lote_entity_1 = require("./lote.entity");
let LoteRepository = class LoteRepository {
    constructor(loteRepo) {
        this.loteRepo = loteRepo;
    }
    async create(barrio_id, loteDTO) { }
};
LoteRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(lote_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoteRepository);
exports.default = LoteRepository;
function select_lotes_by_propietario(propietario_id, device_id) {
    return `SELECT * from select_lotes_by_propietario('${propietario_id}', '${device_id}');`;
}
function insert_propiertario_de_lote_query(lote_id, barrio_id, propietario_id, device_id, lote_nickname) {
    return `SELECT insert_propietario_of_lote('${barrio_id}', '${lote_id}', '${propietario_id}', '${device_id}', '${lote_nickname}');`;
}
function parse_insert_query(response) {
    return !!response[0];
}
function delete_lote_query(lote_id) {
    return `SELECT * from delete_lote('${lote_id}');`;
}
function select_lotes_with_propietarios(barrio_id) {
    return `SELECT * from select_lotes_with_propietarios('${barrio_id}');`;
}
function insert_lote_query(barrio_id, loteDTO) {
    const { name, street, code, num } = loteDTO;
    return `SELECT * from insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
}
//# sourceMappingURL=lote.repository.js.map