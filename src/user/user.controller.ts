import { Body, Controller, Post } from '@nestjs/common';
import UserRegistrationDTO from './user.register.dto';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: UserRegistrationDTO): Promise<boolean> {
    return await this.userService.register(registerDTO);
  }
}
