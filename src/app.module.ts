import { Module } from '@nestjs/common';
import { AdminPanelModule } from './admin_panel/admin.panel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barrio } from './admin_panel/barrio.entity';

@Module({
  imports: [AdminPanelModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'test',
      entities: ["src/**/*.entity{.ts,.js}"],
    }),],
})
export class AppModule {}
