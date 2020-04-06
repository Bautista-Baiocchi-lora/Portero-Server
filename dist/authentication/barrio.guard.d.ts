import { ExecutionContext } from "@nestjs/common";
import { SessionGuard } from "src/session/session.guard";
export default class BarrioGuard extends SessionGuard {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
