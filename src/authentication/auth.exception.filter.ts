import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import {Response} from 'express'
import { AuthenticationError } from "./auth.error";


@Catch(AuthenticationError)
export class AuthenticationExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
 
        response.status(403)
        .json(exception)
    }

}