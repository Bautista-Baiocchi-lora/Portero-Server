import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class JwtValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
