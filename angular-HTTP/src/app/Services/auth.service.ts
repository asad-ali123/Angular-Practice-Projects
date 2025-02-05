import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, catchError,  tap, throwError } from "rxjs";
import { User } from "../Model/User";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);
    user = new BehaviorSubject<User | null>(null);

    signup(email: string, password: string) {
        const data = { email: email, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtEWM_zmK-lYk44bKYjog9wGDDvT7Ww5o',
                data).pipe(catchError(this.handleError), tap((res) => {
                    this.handleCreateUser(res)
                }))
    }

    login(email: string, password: string) {
        const data = { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtEWM_zmK-lYk44bKYjog9wGDDvT7Ww5o',
            data).pipe(catchError(this.handleError), tap((res) => {
                this.handleCreateUser(res)
            }))

    }

    private handleCreateUser(res: AuthResponse) {
        const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
        const expiresIn = new Date(expiresInTs);
        const user = new User(res.email, res.localid, res.idToken, expiresIn);
        this.user.next(user)

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