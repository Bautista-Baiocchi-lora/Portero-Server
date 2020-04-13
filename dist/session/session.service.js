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
const session_entity_1 = require("./session.entity");
let SessionService = class SessionService {
    constructor(sessionRepo) {
        this.sessionRepo = sessionRepo;
    }
    async create(account_id, mac_address) {
        return await this.sessionRepo
            .query(create_session_query(account_id, mac_address))
            .then(response => response[0]);
    }
    async verify(session_id, account_id, mac_address) {
        return await this.sessionRepo
            .query(validate_session_query(session_id, account_id, mac_address))
            .then(response => !!response);
    }
};
SessionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SessionService);
exports.SessionService = SessionService;
const session_duration_in_days = 7;
function validate_session_query(session_id, account_id, mac_address) {
    return `SELECT * from validate_session('${session_id}'::uuid, '${mac_address}', '${account_id}'::uuid);`;
}
function create_session_query(account_id, mac_address) {
    return `SELECT * from create_session('${account_id}', '${mac_address}', '${session_duration_in_days}');`;
}
//# sourceMappingURL=session.service.js.map