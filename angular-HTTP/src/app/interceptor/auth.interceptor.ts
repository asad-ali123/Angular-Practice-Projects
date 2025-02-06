import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService: AuthService = inject(AuthService);
  return authService.user.pipe(take(1), exhaustMap(user => {
    if (!user) {
      return next(req)
    }
    const modifiedReq = req.clone({
      params: user?.token ? new HttpParams().set('auth', user.token) : new HttpParams()
    })
    return next(modifiedReq);


  }))
};
