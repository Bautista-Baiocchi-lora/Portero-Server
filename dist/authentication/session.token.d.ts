import Session from "src/session/session.entity";
export declare type SessionToken = Session & {
    type: number;
    email: string;
};
