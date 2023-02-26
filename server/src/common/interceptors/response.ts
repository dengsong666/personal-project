import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<{ data: T }> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          success: true,
          msg: 'asdsf',
        };
      }),
    );
  }
}
