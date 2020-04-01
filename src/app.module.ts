import { Module } from '@nestjs/common';
import { AdminPanelModule } from './admin_panel/admin.panel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { SessionService } from './authentication/session.service';
import PropietarioModule from './propretario/propietario.module';

@Module({
  imports: [AdminPanelModule,AuthenticationModule, PropietarioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),],
})
export class AppModule {}
