import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountType } from 'src/authentication/account.type';
import { AuthenticationError } from 'src/authentication/auth.error';
import * as settings from '../server-config.json';
import { JwtService, JwtSession } from './jwt.service';

@Injectable()
export default class SessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) {}

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

    request.session = session;
    const accountType = this.reflector.get<AccountType[]>('accountType', context.getHandler());
    return accountType ? accountType.includes(session.acc_type) : true;
  }
}

export const AccountTypes = (...type: AccountType[]) => SetMetadata('accountType', type);
