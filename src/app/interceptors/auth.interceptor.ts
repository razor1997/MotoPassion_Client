import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserSessionService} from '../services/user-service.service';

import { catchError, switchMap, throwError } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: UserSessionService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.session.token;
    const clonedReq = token
      ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
      : req;

    return next.handle(clonedReq).pipe(
      catchError(err => {

        if (err.status === 401 && !this.session.isTokenExpired()) {
          return this.authService.refreshToken().pipe(
            switchMap((resp: any) => {
              this.session.setToken(resp.token);

              const retryReq = req.clone({
                setHeaders: {Authorization: `Bearer ${resp.token}`}
              });

              return next.handle(retryReq);
            })
          );
        }

        return throwError(() => err);
      })
    );
  }
}
