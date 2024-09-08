import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoleModule } from 'src/role/role.module';
import { TableStatusModule } from 'src/table-status/table-status.module';
import { OrderStatusModule } from 'src/order-status/order-status.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RoleModule, TableStatusModule, OrderStatusModule]
})
export class SeedModule {}
