
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import Session from './session.entity';


@Injectable()
export class JwtValidationPipe implements PipeTransform {

  constructor(private readonly authService:AuthenticationService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    return await this.authService.decodeJWT(value);
  }
}