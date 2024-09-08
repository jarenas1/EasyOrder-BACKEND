import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get("role")
  seedRole() {
    return this.seedService.roleSeeder();
  }

  @Get("table-status")
  seedTableStatus() {
    return this.seedService.tableStatusSeeder();
  }

  @Get("order-status")
  seedOrderStatus() {
    return this.seedService.orderStatusSeeder();
  }
}
