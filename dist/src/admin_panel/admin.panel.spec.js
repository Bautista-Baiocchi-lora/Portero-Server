"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const admin_panel_controller_1 = require("./admin.panel.controller");
const admin_panel_module_1 = require("./admin.panel.module");
describe('AppController', () => {
    let app;
    beforeAll(async () => {
        app = await testing_1.Test.createTestingModule({
            imports: [admin_panel_module_1.AdminPanelModule]
        }).compile();
    });
    describe('Register Barrio', () => {
        it('email and name are unique', () => {
            const adminController = app.get(admin_panel_controller_1.AdminPanelController);
            adminController.register(dummyRegistration).then(response => expect(response).toBe(true));
        });
    });
    describe('Duplicate Barrio registration', () => {
        it('Cant register with a taken name/email', () => {
            const adminController = app.get(admin_panel_controller_1.AdminPanelController);
            adminController.register(dummyRegistration).then(response => expect(response).toBe(false));
        });
    });
});
const dummyRegistration = {
    email: 'test@gmail.com',
    name: 'austral',
    password: 'pass'
};
//# sourceMappingURL=admin.panel.spec.js.map