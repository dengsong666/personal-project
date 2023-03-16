import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const PublicInterception = this.reflector.getAllAndOverride('PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (PublicInterception) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) throw new UnauthorizedException();
    return user;
  }
}
