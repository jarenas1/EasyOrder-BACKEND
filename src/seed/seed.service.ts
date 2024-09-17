import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  RolesEnum} from 'src/common/enums';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService
  ) {}

  async roleSeeder() {
    try {
      const result = await this.roleService.createManySeed([{type:RolesEnum.admin}, {type:RolesEnum.mesero}])
      if(!result) {
        throw new Error("Role already exist")
      }
      return result
    } catch (error) {
      throw new ForbiddenException({message: error.message})
    }
  }

  async adminSeeder() {

    const admin = await this.roleService.findOneSeed(RolesEnum.admin)
    try {
      const result = await this.userService.create({
        username: "admin123",
        name: "admin",
        lastname: "admin12@hotmail.com",
        password: "admin123*",
        role: admin})
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
