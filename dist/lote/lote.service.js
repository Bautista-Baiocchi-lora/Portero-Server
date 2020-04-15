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
const invite_service_1 = require("../invite/invite.service");
const invite_type_1 = require("../invite/invite.type");
const jwt_service_1 = require("../session/jwt.service");
const typeorm_2 = require("typeorm");
const lote_entity_1 = require("./lote.entity");
let LoteService = class LoteService {
    constructor(loteRepo, inviteService) {
        this.loteRepo = loteRepo;
        this.inviteService = inviteService;
    }
    async create(barrio_id, loteDTO) {
        return await this.loteRepo
            .query(insert_lote_query(barrio_id, loteDTO))
            .then(parse_insert_query);
    }
    async associatePropietario(associateDTO, session) {
        const invite = await this.inviteService.decode(associateDTO.invite);
        if (invite.type !== invite_type_1.InviteType.ASSOCIATE_PROP) {
            throw new Error('Invite must be of type: Associate_Prop');
        }
        return await this.loteRepo
            .query(insert_propiertario_de_lote_query(invite.lote_id, invite.barrio_id, session.acc_id, session.device_id, associateDTO.lote_nickname))
            .then(parse_insert_query);
    }
    async getAllLotesOfPropietario(session) {
        return await this.loteRepo
            .query(select_lotes_by_propietario(session.acc_id, session.device_id))
            .then(response => response[0]);
    }
    async getAllLotesAndPropietariosInBarrio(barrio_id) {
        const lotes = await this.loteRepo.query(select_lotes_query(barrio_id));
        const lote_ids = lotes.map(lote => lote.lote_id);
        const propietariosOfLotes = await this.loteRepo.query(select_propietarios_of_lotes(lote_ids));
        return lotes.map(lote => {
            return Object.assign(Object.assign({}, lote), { propietarios: propietariosOfLotes.filter(prop => prop.lote_id === lote.lote_id) });
        });
    }
    async delete(lote_id, barrio_id) {
        return await this.loteRepo.delete({ id: lote_id, barrio_id });
    }
};
LoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(lote_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        invite_service_1.default])
], LoteService);
exports.default = LoteService;
function select_lotes_by_propietario(propietario_id, device_id) {
    return `SELECT * from select_lotes_by_propietario('${propietario_id}', '${device_id}');`;
}
function select_propietarios_of_lotes(lote_ids) {
    return `SELECT * from select_propietarios_of_lotes(array${JSON.stringify(lote_ids)
        .split('"')
        .join("'")}::uuid[]);`;
}
function insert_propiertario_de_lote_query(lote_id, barrio_id, propietario_id, device_id, lote_nickname) {
    return `SELECT insert_propietario_of_lote('${barrio_id}', '${lote_id}', '${propietario_id}', '${device_id}', '${lote_nickname}');`;
}
function parse_insert_query(response) {
    return !!response[0];
}
function select_lotes_query(barrio_id) {
    return `SELECT * from select_lotes_by_barrio('${barrio_id}');`;
}
function insert_lote_query(barrio_id, loteDTO) {
    const { name, street, code, num } = loteDTO;
    return `SELECT insert_lote('${barrio_id}', '${name}', '${num}', '${street}', '${code}');`;
}
//# sourceMappingURL=lote.service.js.map