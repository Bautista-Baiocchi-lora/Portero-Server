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
const session_duration_in_days = 7;
let SessionService = class SessionService {
    constructor(connection) {
        this.connection = connection;
    }
    async createSession(account_id) {
        return await this.connection.query(create_session_query(account_id));
    }
};
SessionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], SessionService);
exports.SessionService = SessionService;
function parse_create_session_query(response) {
    response = response[0].create_session.replace('(', '').replace(')', '').replace('\"', '').replace('"', '').split(',');
    const session = {
        session_id: response[0],
        account_id: parseInt(response[1]),
        creation_date: response[2],
        exp: parseInt(response[3])
    };
    return session;
}
function create_session_query(account_id) {
    return `SELECT create_session('${account_id}', '${session_duration_in_days}');`;
}
//# sourceMappingURL=session.service.js.map