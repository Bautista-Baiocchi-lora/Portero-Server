import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from './admin.panel.controller';
import { BarrioService } from '../barrio/barrio.service';
import  {Barrio}  from '../barrio/barrio.entity';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { AdminPanelModule } from './admin.panel.module';
import { AppModule } from '../app.module';
import { async } from 'rxjs/internal/scheduler/async';
import { Repository, QueryFailedError, InsertResult } from 'typeorm';

describe('Admin Panel', () => {
  let app: TestingModule;
  let adminController: AdminPanelController;
  let barrioService: BarrioService;

  beforeAll( async () => {
    app = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    adminController = app.get<AdminPanelController>(AdminPanelController);
    barrioService = app.get<BarrioService>(BarrioService);

    await barrioService.delete(dummyRegistration.email)
  })

  it('Register Barrio', async () => {
      expect(await adminController.register(dummyRegistration)).toBeDefined()
  });

  it('Cant register barrio with taken email or name', async () => {
      expect(await adminController.register(dummyRegistration)).toThrowError()
  });

  afterAll( async () => {
    app.close()
  })

});


const dummyRegistration: BarrioRegistrationDTO = {
  email: 'test@gmail.com',
  name: 'austral',
  password: 'pass'
}