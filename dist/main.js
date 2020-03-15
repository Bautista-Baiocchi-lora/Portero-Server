"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const query_failed_exception_filter_1 = require("./query-failed.exception.filter");
const jwt_exception_filter_1 = require("./authentication/jwt.exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new query_failed_exception_filter_1.QueryFailedExceptionFilter());
    app.useGlobalFilters(new jwt_exception_filter_1.JwtExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map