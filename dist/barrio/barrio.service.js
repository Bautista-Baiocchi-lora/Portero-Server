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
const barrio_entity_1 = require("./barrio.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let BarrioService = class BarrioService {
    constructor(barrioRepository) {
        this.barrioRepository = barrioRepository;
    }
    async register(registerDTO) {
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
        return await this.barrioRepository.query(insert_barrio_query(registerDTO));
    }
    async delete(email) {
        return await this.barrioRepository.query(delete_barrio_query(email));
    }
};
BarrioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(barrio_entity_1.Barrio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BarrioService);
exports.BarrioService = BarrioService;
function delete_barrio_query(email) {
    return `DELETE from account WHERE email = '${email}';`;
}
function insert_barrio_query(registerDTO) {
    const { email, password, name } = registerDTO;
    return `SELECT insert_barrio('${email}', '${password}', '${name}');`;
}
//# sourceMappingURL=barrio.service.js.map