import Session from "./session.entity";
export default interface Cookie {
    jwt: string;
    session: Session;
}
