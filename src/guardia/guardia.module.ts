import { Module } from '@nestjs/common';
import SessionModule from 'src/session/session.module';
import GuardiaController from './guardia.controller';
import GuardiaService from './guardia.service';

@Module({ controllers: [GuardiaController], providers: [GuardiaService], imports: [SessionModule] })
export default class GuardiaModule {}
