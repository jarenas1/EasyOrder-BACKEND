import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly roleService: RoleService,
    private readonly configService:  ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("SECRET"),
    });
  }

  async validate(payload: any) {
    const roles = await this.roleService.findAll();
    const verdad = roles.find((role) => role.type === payload.user.role.type)
    if (!verdad) {
      throw new UnauthorizedException("no esta permitido")
    }
    return { id: payload.sub, user: payload.user };
  }
}
