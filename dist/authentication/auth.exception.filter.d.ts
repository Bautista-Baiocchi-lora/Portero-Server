import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AuthenticationExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
