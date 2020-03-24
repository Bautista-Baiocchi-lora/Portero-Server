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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let BarrioInvite = class BarrioInvite {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], BarrioInvite.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], BarrioInvite.prototype, "barrio_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], BarrioInvite.prototype, "account_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], BarrioInvite.prototype, "creation_date", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Number)
], BarrioInvite.prototype, "exp", void 0);
BarrioInvite = __decorate([
    typeorm_1.Entity()
], BarrioInvite);
exports.default = BarrioInvite;
//# sourceMappingURL=barrio.invite.entity.js.map