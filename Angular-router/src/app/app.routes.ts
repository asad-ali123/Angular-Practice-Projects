import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CousresDetailsComponent } from './courses/cousres-details/cousres-details.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
// import { AuthguardService } from './Services/authguard.service';
import { CanActivate, CanDeactivate , CanResolve } from './auth.guard';

export const routes: Routes = [

    // {
    //     path:'' , redirectTo: 'home' ,  pathMatch:'full'},
    {
        path: '', component: HomeComponent
    },
    {
        path: 'home',component: HomeComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'courses', component: CoursesComponent, resolve: { courses: CanResolve }
     },
    // {
    //     path: 'contact', component: ContactComponent , canDeactivate:[AuthguardService]
    // },
    {
        path: 'contact', component: ContactComponent, canDeactivate: [CanDeactivate]  //*using function
    },
    // {
    //     path: 'courses/course/:id',
    //     component: CousresDetailsComponent
    // }, simlar to a child route

    {
        path: 'courses', canActivateChild: [CanActivate] ,children: [
        { path: 'course/:id', component: CousresDetailsComponent},
        { path: 'course/:id', component: CousresDetailsComponent},
        // {path: 'checkout', component: CheckoutComponent , canActivate:[AuthguardService]}, //*use without function
            { path: 'checkout', component: CheckoutComponent , data: {name: 'Test' , price: 350}} 
        ]
    },

    {
        path: 'login',
        component: LoginComponent
    }



    //*! Always created wild card router at the end of all routes being created

    , {
        path: '**',
        component: NotFoundComponent
    }
];


