import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [UserModule, RoleModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: "10m"}
  })],
  exports: [AuthService]
})
export class AuthModule {}
