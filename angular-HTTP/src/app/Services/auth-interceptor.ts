// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// @Injectable({
//     providedIn: 'root'
// })
// export class AuthInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const modifideReq = req.clone({ 
//             setHeaders: {
//                 Authorization: `Bearer`
//             }
// });
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




import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,

    HttpInterceptor,
} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ){
       
        const authRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer`,
            },
        });

        // Pass the modified request to the next handler
        return next.handle(authRequest);
    }
}