import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CourseService } from './Services/course.service';
import { ServicesService } from './Services/services.service';
import { UserService } from './Services/user.service';
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';
// import { AuthguardService } from './Services/authguard.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CourseService, ServicesService, UserService, AuthService]
})
export class AppComponent implements OnInit {
  title = 'router';

  router = inject(Router)

  showLoader: boolean = false;
  ngOnInit(): void {
    this.router.events.subscribe((eventRouter: any) => {
      if (eventRouter instanceof NavigationStart) {
        this.showLoader = true
      }
    
      if (eventRouter instanceof NavigationEnd || eventRouter instanceof NavigationCancel) {
        this.showLoader = false
      }
      
    })

  }
}
