import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from './admin.panel.controller';
import { AdminPanelService } from './admin.panel.service';
import { Barrio } from './barrio.entity';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { AdminPanelModule } from './admin.panel.module';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[AdminPanelModule]
    }).compile();
  });

  describe('Register Barrio', () => {
    it('email and name are unique', () => {
      const adminController = app.get<AdminPanelController>(AdminPanelController);
      adminController.register(dummyRegistration).then(response => expect(response).toBe(true))
    });
  });

  describe('Duplicate Barrio registration', () => {
    it('Cant register with a taken name/email', () => {
      const adminController = app.get<AdminPanelController>(AdminPanelController);
      adminController.register(dummyRegistration).then(response => expect(response).toBe(false))
    });
  });

});


const dummyRegistration: BarrioRegistrationDTO = {
  email: 'test@gmail.com',
  name: 'austral',
  password: 'pass'
}