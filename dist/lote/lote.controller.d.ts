import LoteService from "./lote.service";
import CreateLoteDTO from "./create.lote.dto";
import { JwtSession } from "src/session/jwt.service";
export default class LoteController {
    private readonly loteService;
    constructor(loteService: LoteService);
    create(createDTO: CreateLoteDTO, session: JwtSession): Promise<any>;
}
