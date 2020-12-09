import { Body, Controller, Post } from '@nestjs/common';
import AdminRegistrationDTO from './admin.register.dto';
import AdminService from './admin.service';

@Controller('admin')
export default class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() registerDTO: AdminRegistrationDTO): Promise<boolean> {
    return await null;
  }
}
