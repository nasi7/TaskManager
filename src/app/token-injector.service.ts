import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInjectorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    if (sessionStorage.getItem('userToken')) {
      const token = 'bearer ' + sessionStorage.getItem('userToken');
      let newHeaders = req.headers;
      newHeaders = newHeaders.append('Authorization', token);
      const authReq = req.clone({ headers: newHeaders });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
