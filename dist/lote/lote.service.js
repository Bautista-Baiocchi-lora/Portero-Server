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
const typeorm_1 = require("typeorm");
let LoteService = class LoteService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(barrio_id, loteDTO) {
        return await this.connection.query(insert_lote_query(barrio_id, loteDTO));
    }
};
LoteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], LoteService);
exports.default = LoteService;
function insert_lote_query(barrio_id, loteDTO) {
    const { name, street, code, num } = loteDTO;
    return `SELECT insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
}
//# sourceMappingURL=lote.service.js.map