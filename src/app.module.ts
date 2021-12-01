import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/auth.module';
import { BarrioModule } from './barrio/barrio.module';
import PostgresModule from './postgres/postgres.module';
import UserModel from './user/user.modules';

@Module({
  imports: [UserModel, BarrioModule, AuthenticationModule, PostgresModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
