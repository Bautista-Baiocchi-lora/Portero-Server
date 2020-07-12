import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import UserController from './user.controller';
import UserService from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SessionModule],
})
export default class UserModule {}
