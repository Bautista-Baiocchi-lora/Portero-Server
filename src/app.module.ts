import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/auth.module';
import { BarrioModule } from './barrio/barrio.module';
import { InviteModule } from './invite/invite.module';
import LoteModule from './lote/lote.module';
import PropietarioModule from './propretario/propietario.module';
import TrabajadorModule from './trabajador/trabajador.module';

@Module({
  imports: [
    PropietarioModule,
    InviteModule,
    BarrioModule,
    TrabajadorModule,
    AuthenticationModule,
    LoteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
export class AppModule {}
