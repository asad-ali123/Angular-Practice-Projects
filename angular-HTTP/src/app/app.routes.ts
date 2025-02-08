import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { canActive } from './authGuard/authGuard';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'home', component: HomeComponent
    }, {
        path: 'dashboard', component: DashboardComponent, canActivate: [canActive]
    }, {
        path: 'login', component: LoginComponent
    }
];
