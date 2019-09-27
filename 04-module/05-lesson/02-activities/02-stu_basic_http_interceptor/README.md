Instructions

* Implement a basic interceptor that simply logs the request
* Create a file in the shared folder called `http-error.interceptor.ts` and add the following boilerplate code:
  - This code can be found in the docs at https://angular.io/guide/http#http-interceptors.
```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    console.log('req', req);

    return next.handle(req);
  }
}
```

- In your `app.module.ts` make sure to import the following: `HTTP_INTERCEPTORS` and `HTTPErrorInterceptor`.
- Once imported, add the following to your `providers` array: `{ provide: HTTP_INTERCEPTORS, useClass: HTTPErrorInterceptor, multi: true }`