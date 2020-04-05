
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AuthenticationService } from '../authentication/auth.service';
import Session from './session.entity';
import { JwtService, JwtSession } from './jwt.service';


@Injectable()
export class JwtValidationPipe implements PipeTransform {

  constructor(private readonly jwtService:JwtService){}

  async transform(value: any, metadata: ArgumentMetadata): Promise<JwtSession> {
    return await this.jwtService.decodeJWT(value);
  }
}