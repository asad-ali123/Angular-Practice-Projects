import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    // headers : req.headers.append('auth','abcxyz')
    setHeaders:{
      auth : 'Checking'
    }
  })
  return next(modifiedReq);
};
