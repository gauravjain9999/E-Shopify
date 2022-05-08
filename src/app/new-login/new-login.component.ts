import { NewRegisterComponent } from './../new-register/new-register.component';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../core/Pipe/Service/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../core/Pipe/Service/data-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomErrorStateMatcherService } from '../core/Pipe/Service/custom-error-state-matcher.service';

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
    private dialogRef: MatDialogRef<NewLoginComponent>,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  login = new FormGroup ({

    email: new FormControl('',    [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  })

  customErrorStateMatcher: CustomErrorStateMatcherService = new CustomErrorStateMatcherService();

  onSubmit() {

    // console.log(this.login.value.email);

    this.email = this.login.value.email;
    this.pass = this.login.value.password;

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
    this.dialogRef.close();
    this.isLoading = true;
    this.router.navigate(['mainPage']);
    this.isLoading = false;
    this.notificationService.showNotification('Successfully Login', 'Close');
  }

  onSignUp() {

    this.dialog.open(NewRegisterComponent, {
      height: '650px',
      width: '800px'
    })
    this.dialogRef.close()
    // this.router.navigate(['new-register']);
  }

  getFormControlName(controlName: string): FormControl
  {
    return this.login.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string)
  {
    switch(controlName)
  {
    case "email":
      if(errorType === "required"){
        return " *Email is required"
      }
      else if(errorType ==="email"){
        return "*Email should be in Correct Format.Eg: someone@example.com"
      }
      else{
        return "";
      }

      case "password":
        if(errorType === "required")
        {
          return "*Password is required"
        }
        else{
          return "";
        }
        default: return "";
    }
  }

}
