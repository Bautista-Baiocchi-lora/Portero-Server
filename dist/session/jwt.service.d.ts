import Session from './session.entity';
export declare class JwtService {
    constructor();
    sign(data: any, secret: string): Promise<string>;
    verify(token: any, secret: string): Promise<JwtSession>;
    decode(token: any): Promise<JwtSession>;
}
export declare type JwtSession = Session & {
    type: number;
    email: string;
};
