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
const session_service_1 = require("./session.service");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = "our super secret";
let AuthenticationService = class AuthenticationService {
    constructor(connection, sessionService) {
        this.connection = connection;
        this.sessionService = sessionService;
    }
    async authenticate(logInDTO) {
        const response = await this.connection.query(get_password_query(logInDTO));
        const account = parse_select_account_reponse(response);
        const authenticated = await bcrypt.compare(logInDTO.password, account.password);
        if (authenticated) {
            const session = await this.sessionService.create(account.id);
            return await this.signJWT(session);
        }
        return 'Invalid credentials.';
    }
    async logOut(session) {
    }
    async verifySession(session) {
        if (new Date(session.exp) > new Date()) {
            return false;
        }
        return await this.sessionService.verify(session.id);
    }
    async signJWT(session) {
        return await jwt.sign(session, secret);
    }
    async verifyJWT(token) {
        return await jwt.verify(token, secret);
    }
    async decodeJWT(token) {
        return await jwt.decode(token);
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        session_service_1.SessionService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
function parse_select_account_reponse(response) {
    response = response[0].select_account_password.split(',');
    return {
        "id": response[0].split('(')[1],
        "password": response[1].split(')')[0]
    };
}
function get_password_query(logInDTO) {
    return `SELECT select_account_password('${logInDTO.email}');`;
}
//# sourceMappingURL=authentication.service.js.map