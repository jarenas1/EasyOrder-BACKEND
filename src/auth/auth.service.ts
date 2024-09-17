import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/create-authLogin.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(register: RegisterDto) {
    return await this.userService.create(register)
  }

  async validateUser(loginUser: LoginDto) {
    try {
      const {password, ...user} = await this.userService.findByUsername(loginUser.username);
      const match = await bcrypt.compare(loginUser.password,password)
      if (!user && !password && !match) {
        throw new Error("User with that credentials is unauthorized");
      }
      return user

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }

  async login(loginUser: LoginDto) {
    try {
      const {id, ...userAuthorized} = await this.validateUser(loginUser)
      if (userAuthorized) {
        let ACCESS_TOKEN = await this.jwtService.signAsync({sub: id, user: userAuthorized}, {secret: this.configService.get("SECRET")})
        return { ACCESS_TOKEN }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }
}
