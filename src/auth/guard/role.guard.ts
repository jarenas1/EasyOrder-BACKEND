import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES } from "src/common/decorators/role.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const AuthRoles = this.reflector.getAllAndOverride(ROLES,[
            context.getHandler(),
            context.getClass()
        ])

        const {user} = context.switchToHttp().getRequest()

        if (!AuthRoles || AuthRoles.length === 0) true

        const can = AuthRoles.some((role) => role === user.user.role?.type)

        if (!can) {
            throw new ForbiddenException("Don't have access to this method")
        }

        return can

    }

}
