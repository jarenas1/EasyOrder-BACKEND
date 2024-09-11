import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/create-authLogin.dto';
import { jwtExists } from 'src/common/decorators/jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  // @Post('validate')
  // async validate(@jwtExists() request : string) {
  //   const sera= await this.authService.checkjwt(request)
  //   return {message: sera}
  // };
}
