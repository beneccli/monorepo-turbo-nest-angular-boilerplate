import * as common from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

/*
 * Add request tracking by adding logging context id used during
 * the request processing into repsonse header
 */
@common.Injectable()
export class RequestIdResponseHeaderInterceptor
  implements common.NestInterceptor
{
  intercept(
    context: common.ExecutionContext,
    next: common.CallHandler,
  ): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    if (req.id) {
      res.setHeader('X-Request-Id', req.id.toString());
    }

    return next.handle().pipe();
  }
}
