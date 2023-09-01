import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../auth/types/auth-response.type';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data.data,
          response: {
            status: data.status,
            message: data.message,
            success: data.success,
            code: data.code,
          } as unknown as BaseResponse<typeof data.data | undefined>,
        };
      })
    );
  }
}
