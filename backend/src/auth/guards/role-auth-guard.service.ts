import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Role } from "../../shared/enums/role.enum";
import { ROLES_KEY } from "../../shared/decorators/roles.decorator";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return requiredRoles.some((roles) => request.user?.roles?.includes(roles));
  }
}
