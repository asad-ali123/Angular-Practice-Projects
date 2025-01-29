import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  activeRoute = inject(ActivatedRoute)

  // * Login method using ViewChild decurator
  // @ViewChild('username') username!: ElementRef
  // @ViewChild('password') password!: ElementRef


  // onLogin() {
  //   let username = this.username.nativeElement.value;
  //   let password = this.password.nativeElement.value;
  //    let checkUser = this.authService.login(username, password);


  //    if(checkUser === undefined){
  //     alert ('The login credentials you have entered is not Correct!')
  //    }else{
  //     alert(`Well Come ${checkUser.name} you are loggedin...`)
  //    }

  //    username = "";
  //    password= "";

  // }

  // *Login method using ngModel

  username: string = "";
  password: string = "";

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((q) => {
      const logout = Boolean(q.get('logout'));
      if (logout) {
        this.authService.logout();         
        alert('You are now logged out ' + this.authService.isLogged)
      }

    })

  }


  onLogin() {

    let checkUser = this.authService.login(this.username, this.password)
    
    if (checkUser === undefined) {
      alert('The login credentials you have entered is not Correct!');
    } else {
      alert(`Well Come ${checkUser.name} you are loggedin...`);
      let value=this.authService.isAuthenticated()
      console.log(value)
      this.router.navigateByUrl('/courses')



    }



    this.username = ""
    this.password = ""

  }



}
