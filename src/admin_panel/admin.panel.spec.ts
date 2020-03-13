import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from './admin.panel.controller';
import { AdminPanelService } from './admin.panel.service';
import  {Barrio}  from './barrio.entity';
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { AdminPanelModule } from './admin.panel.module';
import { AppModule } from '../app.module';
import { async } from 'rxjs/internal/scheduler/async';
import { Repository, QueryFailedError, InsertResult } from 'typeorm';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();
  });

  describe('Register Barrio', () => {
    it('email and name are unique', async () => {
      const adminController = app.get<AdminPanelController>(AdminPanelController);
      expect(await adminController.register(dummyRegistration)).toBeDefined()
    });
  });

  describe('Cant register two barrios with same email', () => {
    it('duplicate barrio created', async () => {
      const adminController = app.get<AdminPanelController>(AdminPanelController);
      const response:QueryFailedError= await adminController.register(dummyRegistration)
      expect(response.).toBe(QueryFailedError)
    });
  });

  afterAll( async () => {
    const barrioRepository = app.get<Repository<Barrio>>(Repository);
    await barrioRepository.createQueryBuilder().delete().from(Barrio).execute()
  })

});


const dummyRegistration: BarrioRegistrationDTO = {
  email: 'test@gmail.com',
  name: 'austral',
  password: 'pass'
}