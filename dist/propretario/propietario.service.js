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
const bcrypt = require('bcrypt');
const saltRounds = 10;
let PropietarioService = class PropietarioService {
    constructor(connection) {
        this.connection = connection;
    }
    async register(registerDTO) {
        registerDTO.password = await bcrypt.hash(registerDTO.password, saltRounds);
        return await this.connection.query(create_insert_propietario_query(registerDTO)).then(parse_insert_propietario_query);
    }
};
PropietarioService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], PropietarioService);
exports.default = PropietarioService;
function create_insert_propietario_query(registerDTO) {
    const { email, password, first_name, last_name, doc_id, doc_type, device_id } = registerDTO;
    return `SELECT insert_propietario('${email}', '${password}', '${first_name}', '${last_name}', '${doc_id}', '${doc_type}', '${device_id}');`;
}
async function parse_insert_propietario_query(response) {
    return !!response[0];
}
//# sourceMappingURL=propietario.service.js.map