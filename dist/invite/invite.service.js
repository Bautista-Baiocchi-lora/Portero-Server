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
const invite_type_1 = require("./invite.type");
const jwt = require('jsonwebtoken');
let InviteService = class InviteService {
    constructor(connection) {
        this.connection = connection;
    }
    async sign(invite) {
        const registration = await this.connection
            .query(register_invite_query())
            .then(response => response[0]);
        const token = await jwt.sign(invite, registration.encry_key);
        return {
            invite: token,
            id: registration.invite_id,
        };
    }
    async createLoteInvite(lote_id, barrio_id) {
        return await this.sign(loteInvite(lote_id, barrio_id));
    }
    async decode(signedInvite, invite_id) {
        const key = await this.connection
            .query(select_invite_key_query(invite_id))
            .then(response => response[0]['key']);
        return await jwt.decode(signedInvite, key);
    }
};
InviteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], InviteService);
exports.default = InviteService;
function loteInvite(lote_id, barrio_id) {
    return { type: invite_type_1.InviteType.ASSOCIATE_PROP, lote_id, barrio_id };
}
function select_invite_key_query(invite_id) {
    return `SELECT key from invite where id = '${invite_id}';`;
}
function register_invite_query() {
    return 'SELECT * from register_invite();';
}
//# sourceMappingURL=invite.service.js.map