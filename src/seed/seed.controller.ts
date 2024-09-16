import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get("role")
  seedRole() {
    return this.seedService.roleSeeder();
  }

  @Get()
  seedAdmin() {
    return this.seedService.adminSeeder();
  }
}
