import { ExecutionContext } from "@nestjs/common";
import { SessionGuard } from "src/session/session.guard";
export default class PropietarioGuard extends SessionGuard {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
