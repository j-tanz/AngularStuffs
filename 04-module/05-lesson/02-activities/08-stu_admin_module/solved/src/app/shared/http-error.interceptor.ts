import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { ErrorNotificationService } from './error-notification.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HTTPErrorInterceptor implements HttpInterceptor {

  constructor(private errorNotificationService: ErrorNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          this.errorNotificationService.showError(error.message);

          return throwError(error.message);
        })
      )
  }
}