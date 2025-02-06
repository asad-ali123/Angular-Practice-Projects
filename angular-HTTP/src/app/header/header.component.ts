import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  private userSubject !: Subscription;


  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User |null ) => {
      console.log(user)
      this.isLoggedIn = user ? true : false;
    })
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }

}
