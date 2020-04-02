import Propietario from "src/propretario/propietario.entity";
import { Barrio } from "src/barrio/barrio.entity";
export default class Session {
    id: string;
    account_id: number;
    creation_date: string;
    exp: number;
    account?: Barrio | Propietario;
}
