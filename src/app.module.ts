import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import UserModel from './user/user.modules';

@Module({
  imports: [UserModel, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
