import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from "./header/header.component";

import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'angular-HTTP';
  authservice: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.authservice.autoLogin();
  }
}
