// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const modifideReq = req.clone({ headers: req.headers.append('auth', 'abcxyz') });
//         return next.handle(modifideReq);


//     }

// }

// export class AuthInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const authReq = req.clone({
//             setHeaders: {
//                 Authorization: `Bearer YOUR_ACCESS_TOKEN` // Replace with dynamic token
//             }
//         });

//         return next.handle(authReq);
//     }
// }