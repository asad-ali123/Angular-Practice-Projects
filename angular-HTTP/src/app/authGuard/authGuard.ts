import { inject } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { map, take } from "rxjs";

export const canActive = (router: ActivatedRoute, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const route: Router = inject(Router)
    return authService.user.pipe(take(1), map((user) => {
        const loggedIn = user ? true : false;
        if (loggedIn) {
            return true;
        }
        return route.createUrlTree(['login'])
    }))

}