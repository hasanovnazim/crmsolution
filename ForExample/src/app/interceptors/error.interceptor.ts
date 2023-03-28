import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NotificationService } from '../shared/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (
            event.body.code === 2002 ||
            event.body.code === 2003 ||
            event.body.code === 2004
          ) {
            this.notification.show('error', event.body.message);
          }
        }
        return event;
      }),
      catchError((error, caught) => {
        if (error.status === 403) {
          this.notification.show('error', error.error.Message);
          return throwError(error);
        }
        if (error instanceof HttpErrorResponse) {
          if (error.status !== 200) {
            this.notification.show('error', error.error.message);
          }
        }
        return throwError(error);
      })
    );
  }
}
