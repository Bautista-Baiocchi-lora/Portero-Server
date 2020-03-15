import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { JsonWebTokenError } from "jsonwebtoken";
import {Response} from 'express'


@Catch(JsonWebTokenError)
export class JwtExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
 
        response.status(403)
        .json(exception)
    }

}