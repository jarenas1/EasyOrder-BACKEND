import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './common/config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { RoleModule } from './role/role.module';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';
import { ProductsModule } from './products/products.module';



@Module({
  imports: [ConfigModule.forRoot({
    load: [configurations],
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.user'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      autoLoadEntities: true,
      synchronize: true,
    }),

  }),
  UserModule,
  SeedModule,
  RoleModule,
  TableModule,
  AuthModule,
  RequestsModule,
  ProductsModule]
})
export class AppModule {}
