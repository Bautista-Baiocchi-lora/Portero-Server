import { Controller, Get, Post, Body } from '@nestjs/common';
import {AdminPanelService} from './admin.panel.service'
import { BarrioRegistrationDTO } from './barrio.registration.dto';
import { BarrioLogInDTO } from './barrio.login.dto';
import { InsertResult, QueryFailedError } from 'typeorm';

@Controller('admin')
export class AdminPanelController {
  constructor(private readonly adminService: AdminPanelService) {}


  @Post('register')
  async register(@Body() registerDTO: BarrioRegistrationDTO): Promise<InsertResult>{
      return await this.adminService.register(registerDTO);
  }

  @Post('authenticate')
  async authenticate(logInDTO: BarrioLogInDTO): Promise<boolean> {
    return false
  }
}
