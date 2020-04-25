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
const invite_service_1 = require("../invite/invite.service");
const invite_type_1 = require("../invite/invite.type");
const jwt_service_1 = require("../session/jwt.service");
const typeorm_1 = require("typeorm");
const query = require("./lote.queries");
let LoteService = class LoteService {
    constructor(loteRepo, inviteService) {
        this.loteRepo = loteRepo;
        this.inviteService = inviteService;
    }
    async create(barrio_id, loteDTO) {
        return await this.loteRepo
            .query(query.insert_lote_query(barrio_id, loteDTO))
            .then(response => response[0]);
    }
    async associatePropietario(associateDTO, session) {
        const invite = await this.inviteService.decode(associateDTO.invite, associateDTO.id);
        if (invite.type !== invite_type_1.InviteType.ASSOCIATE_PROP) {
            throw new Error('Invite must be of type: Associate_Prop');
        }
        return await this.loteRepo
            .query(query.insert_propiertario_de_lote_query(invite.lote_id, invite.barrio_id, session.acc_id, session.device_id, associateDTO.nickname))
            .then(query.parse_insert_query);
    }
    async getAllLotesOfPropietario(session) {
        return await this.loteRepo.query(query.select_lotes_by_propietario(session.acc_id, session.device_id));
    }
    async getAllLotesWithPropietariosByBarrio(barrio_id) {
        return await this.loteRepo.query(query.select_lotes_with_propietarios(barrio_id));
    }
    async delete(lote_id) {
        return await this.loteRepo.query(query.delete_lote_query(lote_id));
    }
};
LoteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        invite_service_1.default])
], LoteService);
exports.default = LoteService;
//# sourceMappingURL=lote.service.js.map