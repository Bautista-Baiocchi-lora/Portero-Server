import { Module } from '@nestjs/common';
import AccountModule from 'src/account/account.module';
import PostgresModule from 'src/postgres/postgres.module';
import BarrioController from './barrio.controller';
import BarrioService from './barrio.service';

@Module({
  imports: [PostgresModule, AccountModule],
  controllers: [BarrioController],
  providers: [BarrioService],
})
export class BarrioModule {}
