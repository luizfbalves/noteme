import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

import { IS_PUBLIC_KEY, JWT_SECRET } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    if (!request) {
      throw new UnauthorizedException()
    }

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('empty token')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET
      })
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('invalid token')
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request)
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}