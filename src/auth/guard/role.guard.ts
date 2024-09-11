import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
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
        console.log(AuthRoles, user);

        const can = AuthRoles.some((role) => role === user.user.role?.type)


        return can

    }

}
