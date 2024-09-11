import { SetMetadata } from "@nestjs/common"
import { RolesEnum } from "../enums"


export const ROLES = "roles"
export const RoleDecorator = (...roles: RolesEnum[]) => SetMetadata(ROLES, roles)
