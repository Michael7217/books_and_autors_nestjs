import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject()
  private readonly JwtService: JwtService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.ExtractTokenFromHeader(request)
    if (!authorization) {
      throw new UnauthorizedException('acesso não autorizado')
    }
    try {
      const payload = this.JwtService.verify(authorization, {
        secret: process.env.SECRET_KEY,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('token inválido');
    }
    return true;
  }

  private ExtractTokenFromHeader(request: Request){
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === "Bearer" ? token : undefined
  }
}
