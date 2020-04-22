import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticationError } from 'src/authentication/auth.error';
import { UserType } from 'src/authentication/user.type';
import * as settings from '../server-config.json';
import { JwtService, JwtSession } from './jwt.service';
import { SessionService } from './session.service';

@Injectable()
export default class SessionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const hasAuthHeader: boolean = Object.keys(request.headers).includes('authorization');
    if (!hasAuthHeader) {
      throw new AuthenticationError('Session undefined.');
    }

    const jwt = request.headers.authorization;
    const session: JwtSession = await this.jwtService.verify(jwt, settings.jwt.session_secret);

    if (!session) {
      throw new AuthenticationError('Session Token invalid.');
    }

    const dbValidated: boolean = await this.sessionService.verify(
      session.session_id,
      session.acc_id,
      session.device_id,
    );

    if (!dbValidated) {
      throw new AuthenticationError('Session Invalid.');
    }

    request.session = session;
    const userType = this.reflector.get<UserType[]>('userType', context.getHandler());
    return userType ? userType.includes(session.type) : true;
  }
}

export const UserTypes = (...type: UserType[]) => SetMetadata('userType', type);
