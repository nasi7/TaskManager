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
    const token = 'bearer ' + sessionStorage.getItem('userToken');
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('Authorization', token);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}
