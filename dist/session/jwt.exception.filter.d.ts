import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class JwtExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
