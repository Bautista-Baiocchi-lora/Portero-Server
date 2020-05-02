import { Module } from '@nestjs/common';
import MessageModule from 'src/message/message.module';
import SessionModule from '../session/session.module';
import PropietarioController from './propietario.controller';
import PropietarioService from './propietario.service';

@Module({
  imports: [SessionModule, MessageModule],
  controllers: [PropietarioController],
  providers: [PropietarioService],
})
export default class PropietarioModule {}
