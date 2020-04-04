import Session from "./session.entity";
export declare class JwtService {
    constructor();
    signJWT(session: Session): Promise<string>;
    verifyJWT(token: any): Promise<boolean>;
    decodeJWT(token: any): Promise<Session>;
}
