import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../Service/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../Service/data-storage.service';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
})
export class NewLoginComponent implements OnInit {
  name: string;
  password: string;
  isLoading: boolean;
  error: string;
  email: string;
  pass: string;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private authService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.pass = form.value.password;

    console.log(this.email, this.pass);

    this.authService.loginIn(this.email, this.pass).subscribe(
      (res) => {
        localStorage.setItem('userData', JSON.stringify(this.email));
        this.onLogin();
        console.log(res);
      },
      (errorRes) => {
        this.isLoading = true;
        if (this.isLoading) {
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              this.error =
                'There is no user record corresponding to this identifier. The user may have been deleted.';
              break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                this.error =
                'We have blocked all requests from this device due to unusual activity. Try again later';
              break;

            case 'INVALID_PASSWORD':
              this.error =
                'The password is invalid or the user does not have a password.';
              break;

            case 'INVALID_EMAIL':
              this.error =
                'Email is Required';
              break;

            case 'MISSING_PASSWORD':
             this.error =
                'Password is required';
              break;
          }
        }

        // this.error = 'An Error Occurred :-' +" "+ errorRes.error.error.message
      }
    );
  }
  onLogin() {
    this.isLoading = true;
    this.router.navigate(['mainPage']);
    this.isLoading = false;
    this.notificationService.showNotification('Successfully Login', 'Close');
  }

  onSignUp() {
    setTimeout(() => {
      this.spinner.show();
    }, 5000);
    this.router.navigate(['new-register']);
  }
}
