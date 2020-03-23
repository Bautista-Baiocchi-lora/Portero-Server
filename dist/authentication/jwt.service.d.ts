import Session from "./session.entity";
export declare class JwtService {
    sign(session: Session): Promise<string>;
    verify(token: any): Promise<boolean>;
    decode(token: any): Promise<Session>;
}
