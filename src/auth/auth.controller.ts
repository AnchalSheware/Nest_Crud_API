import { Body, Controller, Get, Post, UseGuards ,Request  } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthGuard } from './auth.guard.js';
type AuthenticatedRequest = ExpressRequest & {
  user: {
    sub: string;
  };
};
@Controller('auth')
export class AuthController {
  //   constructor(authService : AuthService)  //

  //   {
  //    this.authService = authService

  constructor(private readonly authService: AuthService ,
    private readonly userService : UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    console.log(token);
    return token;
  }

  @Post('login')
  async login(@Body() loginDto : LoginDto)
  {
     return await this.authService.loginUser(loginDto)
  }
@UseGuards(AuthGuard) //Jb profile pe request ayegi tb ye guard activate hoga aur verifictaion and authorisation start krega
  @Get("profile")
  async getProfile(@Request() req:AuthenticatedRequest){
    const userID = req.user.sub;

    const user = await this.userService.getUserID(userID)
    console.log("user",user)
    return user
    
  }

}
