"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let BarrioRepository = class BarrioRepository {
    async isNameTaken(name) {
        return this.barrios.map(barrio => barrio.name).includes(name);
    }
    async isEmailTaken(email) {
        return this.barrios.map(barrio => email).includes(email);
    }
    async save(registerDTO) {
        const oldLength = this.barrios.length;
        return this.barrios.push({
            barrio_id: 123,
            email: registerDTO.email,
            name: registerDTO.name,
            password: registerDTO.password
        }) > oldLength;
    }
    async register(registerDTO) {
        const taken = await this.isEmailTaken(registerDTO.email) || await this.isNameTaken(registerDTO.name);
        if (!taken) {
            return await this.save(registerDTO);
        }
        return false;
    }
};
BarrioRepository = __decorate([
    common_1.Injectable()
], BarrioRepository);
exports.BarrioRepository = BarrioRepository;
//# sourceMappingURL=barrio.repo.js.map