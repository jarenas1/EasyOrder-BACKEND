import { ForbiddenException, Injectable } from '@nestjs/common';
import { orderStatus, roles, tableStatus } from 'src/common/enums';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { RoleService } from 'src/role/role.service';
import { TableStatusService } from 'src/table-status/table-status.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
    private readonly tableStatusService: TableStatusService,
    private readonly orderStatusService: OrderStatusService
  ) {}

  async roleSeeder() {
    try {
      const result = await this.roleService.createManySeed(roles)
      if(!result) {
        throw new Error("Role already exist")
      }
      return result
    } catch (error) {
      throw new ForbiddenException({message: error.message})
    }
  }

  async tableStatusSeeder() {
    try {
      const result = await this.tableStatusService.createSeed(tableStatus)
      if(!result) {
        throw new Error("Status already exist")
      }
      return result
    } catch( error ){
      throw new ForbiddenException({message: error.message})
    }
  }

  async orderStatusSeeder() {
    try {
      const result = await this.orderStatusService.createSeed(orderStatus)
      if(!result) {
        throw new Error("Status already exist")
      }
      return result
    } catch( error ){
      throw new ForbiddenException({message: error.message})
    }
  }
}
