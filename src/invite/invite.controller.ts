import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import SessionGuard from 'src/session/session.guard';

@Controller('invite')
export default class InviteController {
  constructor() {}

  @Post('claim')
  @UseGuards(SessionGuard)
  async claim(@Body() data: any) {}
}
