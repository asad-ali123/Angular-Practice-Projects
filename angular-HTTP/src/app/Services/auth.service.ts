import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);
    error: string | null = null;

    signup(email: string, password: string) {
        const data = { email: email, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtEWM_zmK-lYk44bKYjog9wGDDvT7Ww5o',
                data).pipe(catchError(this.handleError))
    }

    login(email: string, password: string) {
        const data = { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtEWM_zmK-lYk44bKYjog9wGDDvT7Ww5o',
            data).pipe(catchError(this.handleError))

    }

    private handleError(err: any) {
        let errorMessage = 'An unknown error has occured';
        if (!err.error || !err.error.error) {
            return throwError(() => errorMessage)
        }
        switch (err.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'This email is already exists.';
                break;
            case 'OPERATION_NOT_ALLOWED': errorMessage = 'Password sign-in is disabled ';
                break;
            case 'INVALID_LOGIN_CREDENTIALS': errorMessage = 'The email id or password is not correct';
                break;

        }
        return throwError(() => errorMessage)


    }
}