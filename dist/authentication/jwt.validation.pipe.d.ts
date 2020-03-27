import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import Session from './session.entity';
export declare class JwtValidationPipe implements PipeTransform {
    private readonly authService;
    constructor(authService: AuthenticationService);
    transform(value: any, metadata: ArgumentMetadata): Promise<Session>;
}
