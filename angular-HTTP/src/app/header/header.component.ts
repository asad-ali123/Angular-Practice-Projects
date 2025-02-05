import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../Model/User';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  router: Router = inject(Router);
  private userSubject !: Subscription;


  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    })
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe()
  }

  onLogout() {
    this.isLoggedIn = false;
    this.router.navigate([''])

  }

}
