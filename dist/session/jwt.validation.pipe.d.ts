import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { JwtService, JwtSession } from './jwt.service';
export declare class JwtValidationPipe implements PipeTransform {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    transform(value: any, metadata: ArgumentMetadata): Promise<JwtSession>;
}
