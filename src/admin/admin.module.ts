import { Module } from '@nestjs/common';
import AccountModule from 'src/account/account.module';
import PostgresModule from 'src/postgres/postgres.module';
import AdminController from './admin.controller';
import AdminService from './admin.service';

@Module({
  imports: [PostgresModule, AccountModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
