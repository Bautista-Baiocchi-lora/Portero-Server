import Session from "./session.entity";
export default class JwtService {
    sign(session: Session): Promise<string>;
    verify(token: any): Promise<boolean>;
    decode(token: any): Promise<Session>;
}
export declare const JWT: (...dataOrPipes: any[]) => ParameterDecorator;
