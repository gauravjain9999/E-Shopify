import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {
  // This is intentional
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  console.log(request);

   const API_KEY = 'Test-123';
   const req = request.clone({
    setHeaders: {API_KEY, responseType: 'blob'},
  })
    return next.handle(req);
  }
}
