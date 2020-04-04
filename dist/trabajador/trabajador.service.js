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
const typeorm_2 = require("@nestjs/typeorm");
const trabajador_entity_1 = require("./trabajador.entity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let TrabajadorService = class TrabajadorService {
    constructor(trabajadorRepo) {
        this.trabajadorRepo = trabajadorRepo;
    }
    async register(registerDTO) {
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
        return await this.trabajadorRepo.query(create_insert_trabajador_query(registerDTO)).then(parse_insert_trabajador_query);
    }
    async getTrabajador(email) {
        return await this.trabajadorRepo.query(select_trabajador_query(email)).then(parse_select_trabajador_query);
    }
};
TrabajadorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(trabajador_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TrabajadorService);
exports.default = TrabajadorService;
function parse_select_trabajador_query(response) {
    response = response[0].select_trabajador;
    response = response.replace('(', '').replace(')', '');
    response = response.split(',');
    const propietario = {
        id: +response[0],
        email: response[1],
        password: response[2],
        creation_date: response[3],
        first_name: response[5].replace('\"', '').replace('\"', ''),
        last_name: response[6].replace('\"', '').replace('\"', ''),
        doc_id: response[7],
        doc_type: +response[8]
    };
    return propietario;
}
function select_trabajador_query(email) {
    return `SELECT select_trabajador('${email}');`;
}
function create_insert_trabajador_query(registerDTO) {
    const { email, password, first_name, last_name, doc_id, doc_type } = registerDTO;
    return `SELECT insert_trabajador('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}');`;
}
async function parse_insert_trabajador_query(response) {
    return !!response[0];
}
//# sourceMappingURL=trabajador.service.js.map