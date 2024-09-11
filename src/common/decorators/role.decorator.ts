import { SetMetadata } from "@nestjs/common"
import { RolesDecorator } from "../enums"


const ROLES = "roles"
export const RoleDecorator = (...roles: RolesDecorator[]) => SetMetadata(ROLES, roles)
