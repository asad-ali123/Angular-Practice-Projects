// // ! This approch commonly use is before angular 15 version


// import { inject, Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Resolve, Router, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from './auth.service';
// import { ContactComponent } from '../contact/contact.component';
// import { Course } from '../Models/course';
// import { CourseService } from './course.service';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthguardService implements CanActivate, CanActivateChild, CanDeactivate<ContactComponent>, Resolve<Course[]> {
//     constructor() { }
//     authService: AuthService = inject(AuthService);
//     router: Router = inject(Router)
//     courseService: CourseService = inject(CourseService);


//     //   //*use for canActive
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         const checkUser = this.authService.isAuthenticated();
//         if (checkUser === true) {
//             console.log(checkUser)
//             return true;
//         } else {
//             this.router.navigate(['/login']);
//             return false;
//         }

//     }

//     //   //*CanActive child 
//     canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         return this.canActivate(childRoute, state)
//     }

//     // * canDeactivate

//     canDeactivate(component: ContactComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean {
//         return component.canExit();
//     }

//     //   * Resolve guard

//     resolve(): Course[] | Observable<Course[]> | Promise<Course[]> {
//         // let courseList: Course[] = [];
//         // this.courseService.getAllcourses().subscribe((courses:Course[]) => {
//         //     courseList = courses
//         // });
//         // return courseList

//         return this.courseService.getAllcourses()

//     }

// }
