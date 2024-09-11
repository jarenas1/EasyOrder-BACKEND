import { ForbiddenException, Injectable } from '@nestjs/common';
import {  RolesDecorator} from 'src/common/enums';
import { RoleService } from 'src/role/role.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  async roleSeeder() {
    try {
      const result = await this.roleService.createManySeed([{type:RolesDecorator.admin}, {type:RolesDecorator.mesero}])
      if(!result) {
        throw new Error("Role already exist")
      }
      return result
    } catch (error) {
      throw new ForbiddenException({message: error.message})
    }
  }
}