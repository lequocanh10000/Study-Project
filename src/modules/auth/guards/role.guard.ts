import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private roles: string[]) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const accept =  this.roles.includes(request.user.role);
        if(!accept) throw new ForbiddenException('Bạn không có quyền truy cập');
        return accept;
    }
}