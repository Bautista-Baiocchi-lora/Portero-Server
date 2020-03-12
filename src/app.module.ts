import { Module } from '@nestjs/common';
import { AdminPanelModule } from './admin_panel/admin.panel.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminPanelModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'test',
      entities: ['dist/**/*.entity.js'],
    }),],
})
export class AppModule {}
