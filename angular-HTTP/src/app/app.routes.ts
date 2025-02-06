import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { canActive } from './authGuard/authGuard';
import { OverviewComponent } from './dashboard/overview/overview.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'home', component: HomeComponent
    }, {
        path: 'dashboard', component: DashboardComponent, canActivate: [canActive], children: [
            {
                path: 'overview', component: OverviewComponent
            }
        ]
    }, {
        path: 'login', component: LoginComponent
    }
];
