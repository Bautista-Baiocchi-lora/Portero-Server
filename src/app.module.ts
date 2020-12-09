import { Module } from '@nestjs/common';
import { BarrioModule } from './barrio/barrio.module';
import UserModel from './user/user.modules';

@Module({
  imports: [UserModel, BarrioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
