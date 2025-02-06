import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);
    user = new BehaviorSubject<User | null>(null);
    router: Router = inject(Router);
    tokenExpairTimer !: any;

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

    logout() {
        this.user.next(null);
        this.router.navigate(['login']);
        localStorage.removeItem('user');

        if (this.tokenExpairTimer) {
            clearTimeout(this.tokenExpairTimer);
        };
        this.tokenExpairTimer = null;
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('user') || '');
        if (!userData) {
            return
        };
        const loggedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expireIn));
        if (loggedUser.token) {
            this.user.next(loggedUser);
            const timerValue = userData._expireIn.getItem() - new Date().getTime();
            this.autoLogout(timerValue);
        }
    }

    autoLogout(expairTime: number) {
        this.tokenExpairTimer = setTimeout(() => {
            this.logout()
        }, expairTime);
    }

    private handleCreateUser(res: AuthResponse) {
        const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
        const expiresIn = new Date(expiresInTs);
        const user = new User(res.email, res.idToken, res.idToken, expiresIn);
        this.user.next(user);
        this.autoLogout(Number(res.expiresIn) * 1000)


        //store user data in lS
        localStorage.setItem('user', JSON.stringify(user))

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