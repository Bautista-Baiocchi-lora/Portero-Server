import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { SessionService } from './authentication/session.service';
import PropietarioModule from './propretario/propietario.module';
import { BarrioModule } from './barrio/barrio.module';
import { InviteModule } from './invite/invite.module';
import TrabajadorModule from './trabajador/trabajador.module';

@Module({
  imports: [PropietarioModule, InviteModule, BarrioModule, TrabajadorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),],
})
export class AppModule {}
