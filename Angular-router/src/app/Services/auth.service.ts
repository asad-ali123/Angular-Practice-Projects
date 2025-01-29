import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged:boolean=false;

 
  userService: UserService = inject(UserService);

  login(username: string, password: string) {
    let user = this.userService.users.find(user => user.username === username && user.password === password);

    if (user === undefined) {
      this.isLogged = false;
    } else {
      this.isLogged = true
      localStorage.setItem("islogin",`${this.isLogged}`)
    }
     return user;
  }


  logout(){

    this.isLogged = false;
    localStorage.setItem("islogin", `${this.isLogged}`)

  }

  isAuthenticated(){
    let auth = JSON.parse(localStorage.getItem('islogin') || 'false')
    return auth;
  }


}
