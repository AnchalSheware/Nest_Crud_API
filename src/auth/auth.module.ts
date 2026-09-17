import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.js';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService ],
  imports: [UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1 hour' },
    }),
  ],
}) //Decirator
export class AuthModule {}
