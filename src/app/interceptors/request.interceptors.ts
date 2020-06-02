import { Injectable, Optional, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json;charset=utf-8')
        });
        return next.handle(request);
    }
}