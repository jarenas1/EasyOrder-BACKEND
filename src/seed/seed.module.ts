import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RoleModule]
})
export class SeedModule {}
