"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./authentication/auth.module");
const barrio_module_1 = require("./barrio/barrio.module");
const invite_module_1 = require("./invite/invite.module");
const lote_module_1 = require("./lote/lote.module");
const propietario_module_1 = require("./propretario/propietario.module");
const trabajador_module_1 = require("./trabajador/trabajador.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            propietario_module_1.default,
            invite_module_1.InviteModule,
            barrio_module_1.BarrioModule,
            trabajador_module_1.default,
            auth_module_1.AuthenticationModule,
            lote_module_1.default,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                database: 'test',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map