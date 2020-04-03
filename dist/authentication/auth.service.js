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
const session_service_1 = require("../session/session.service");
const jwt_service_1 = require("../session/jwt.service");
const typeorm_1 = require("typeorm");
const auth_error_1 = require("./auth.error");
const bcrypt = require('bcrypt');
let AuthenticationService = class AuthenticationService {
    constructor(connection, sessionService, jwtService) {
        this.connection = connection;
        this.sessionService = sessionService;
        this.jwtService = jwtService;
    }
    async authenticate(logInDTO) {
        const account = await this.connection.query(select_account_query(logInDTO.email)).then(parse_select_account);
        const validated = await bcrypt.compare(logInDTO.password, account.password);
        if (!validated) {
            throw new auth_error_1.AuthenticationError();
        }
        const session = await this.sessionService.create(account.id);
        return await this.jwtService.signJWT(session);
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        session_service_1.SessionService,
        jwt_service_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
const select_account_query = (email) => `SELECT select_account('${email}');`;
function parse_select_account(response) {
    response = response[0].select_account.replace('(', '').replace(')', '').split(',');
    return {
        id: +response[0],
        email: response[1],
        password: response[2],
        type: +response[3]
    };
}
//# sourceMappingURL=auth.service.js.map