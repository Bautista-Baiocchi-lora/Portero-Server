import Session from './session.entity';
export declare class JwtService {
    constructor();
    signJWT(session: JwtSession): Promise<string>;
    verifyJWT(token: any): Promise<boolean>;
    decodeJWT(token: any): Promise<JwtSession>;
}
export declare type JwtSession = Session & {
    type: number;
    email: string;
};
