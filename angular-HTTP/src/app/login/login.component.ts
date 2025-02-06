import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { LoaderComponent } from "../utility/loader/loader.component";
import { SnackbarComponent } from "../utility/snackbar/snackbar.component";
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, LoaderComponent, SnackbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  

  @ViewChild('authForm') authForm!: NgForm;
  authService: AuthService = inject(AuthService);
  router:Router = inject(Router);

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      //Login logic
      this.isLoading = true;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['dashboard']);

        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err;
          this.hideSnackbar();
        }
      })
    } else {
      //Signup logic
      this.isLoading = true
      this.authService.signup(email, password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/dashboard/overview']);


        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err;
          this.hideSnackbar()


        }
      })
    }

    this.authForm.reset()

    // console.log(this.authForm.value.email)

  }
  hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = null
    }, 3000);
  }
}
