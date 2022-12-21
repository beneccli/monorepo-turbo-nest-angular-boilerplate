import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private defaultHttpTimeout = 30000;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.apiBaseUrl + request.url,
      withCredentials: true,
    });

    const timeoutValue =
      request.headers.get('timeout') || this.defaultHttpTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(request).pipe(
      timeout(timeoutValueNumeric),
      retry(1),
      catchError((error: HttpErrorResponse | TimeoutError) => {
        // 1. Timeout error
        if (error instanceof TimeoutError) {
          const httpErrorResponse = new HttpErrorResponse({
            error: error.message,
            headers: request.headers,
            status: 408,
            statusText: 'Request Timeout',
            url: request.url,
          });
          return throwError(httpErrorResponse);
        }
        // 2. Http response error
        else {
          if (error.status === 401) {
            // todo: refresh token
            return throwError(error);
          } else {
            return throwError(error);
          }
        }
      })
    );
  }
}
