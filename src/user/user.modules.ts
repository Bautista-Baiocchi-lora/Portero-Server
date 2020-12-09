import { Module } from '@nestjs/common';
import AccountModule from 'src/account/account.module';
import PostgresModule from 'src/postgres/postgres.module';
import UserController from './user.controller';
import UserService from './user.service';

@Module({
  imports: [AccountModule, PostgresModule],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModel {}
