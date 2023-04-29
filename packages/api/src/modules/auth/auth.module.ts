import { UsersService } from '@/modules/users/users.service';
import { PrismaService } from '@/providers/prisma.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';



import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JWT_SECRET } from "./constants";

@Module({
  providers: [AuthResolver, AuthService, UsersService, PrismaService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  imports: [JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '24h' },
  }),]
})
export class AuthModule { }
