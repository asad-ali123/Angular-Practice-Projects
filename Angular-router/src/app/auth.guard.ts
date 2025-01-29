// ! This approch  used in Leatest version 

import { inject } from "@angular/core";
import { AuthService } from "./Services/auth.service";
import { Router } from "@angular/router";
import { ContactComponent } from "./contact/contact.component";
import { CourseService } from "./Services/course.service";



export const CanActivate = () => {
    const authService = inject(AuthService);
    const router = inject(Router);


    let checkUser = authService.isAuthenticated()

    if (checkUser) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }


}
export const CanDeactivate = (comp: ContactComponent) => {
    return comp.canExit()

}

export const CanResolve = () => {
    const courseService = inject(CourseService);
   return  courseService.getAllcourses()

}