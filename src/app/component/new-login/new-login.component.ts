import { ApplicationService } from './../../core/Service/applicationService.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomErrorStateMatcherService } from 'src/app/core/Service/custom-error-state-matcher.service';
import { NotificationService } from 'src/app/core/Service/notification.service';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
})
export class NewLoginComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
  if (event.key === 'Enter') {
        this.onLogin();
  }
}
  name: string;
  password: string;
  isLoading: boolean;
  error: string;
  email: string;
  pass: string;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private dialogRef: MatDialogRef<NewLoginComponent>,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private applicationService: ApplicationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  login = new UntypedFormGroup ({
    email: new UntypedFormControl('',    [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
  });

  customErrorStateMatcher: CustomErrorStateMatcherService = new CustomErrorStateMatcherService();

  onSubmit() {

    this.email = this.login.value.email;
    this.pass = this.login.value.password;
    // this.authService.loginIn(this.email, this.pass).subscribe(
    //   (res) => {
    //     localStorage.setItem('userData', JSON.stringify(this.email));
    //     this.onLogin();
    //     console.log(res);
    //   },
    //   (errorRes) => {
    //     this.isLoading = true;
    //     if (this.isLoading) {
    //       switch (errorRes.error.error.message) {
    //         case 'EMAIL_NOT_FOUND':
    //           this.error =
    //             'There is no user record corresponding to this identifier. The user may have been deleted.';
    //           break;

    //         case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //             this.error =
    //             'We have blocked all requests from this device due to unusual activity. Try again later';
    //           break;

    //         case 'INVALID_PASSWORD':
    //           this.error =
    //             'The password is invalid or the user does not have a password.';
    //           break;

    //         case 'INVALID_EMAIL':
    //           this.error =
    //             'Email is Required';
    //           break;

    //         case 'MISSING_PASSWORD':
    //          this.error =
    //             'Password is required';
    //           break;
    //       }
    //     }

        // this.error = 'An Error Occurred :-' +" "+ errorRes.error.error.message
      // }
    // );
  }
  onLogin() {

    if(this.login.valid)
    {
      this.applicationService.loginUser(this.login.value).subscribe((data:any) =>{
        console.log(data);
        if(data && data.length > 0){
          this.dialogRef.close();
          localStorage.setItem('loginUser', JSON.stringify(data));
          this.isLoading = true;
          this.applicationService.authRedirectData.emit(true);
          this.router.navigate(['mainPage']);
          this.isLoading = false;
          this.notificationService.showNotification('Welcome Ritik', 'Close');
        }
        else{
          this.notificationService.showNotification('Please Create Your Account First ', 'close');
          this.dialogRef.close();
        }
      });
    }
    else{
      this.notificationService.showNotification('Please Fill your Details', 'close');
    }
  }

  onSignUp() {
    // this.dialog.open(NewRegisterComponent, {
    //   height: '650px',
    //   width: '800px'
    // })
    // this.dialogRef.close()
    // this.router.navigate(['new-register']);
  }

  getFormControlName(controlName: string): UntypedFormControl{
    return this.login.get(controlName) as UntypedFormControl;
  }

  getErrorMessage(controlName: string, errorType: string){
    switch(controlName)
  {
    case 'email':
      if(errorType === 'required'){
        return ' *Email is required';
      }
      else if(errorType ==='email'){
        return '*Email should be in Correct Format.Eg: someone@example.com';
      }
      else{
        return '';
      }

      case 'password':
        if(errorType === 'required')
        {
          return '*Password is required';
        }
        else{
          return '';
        }
        default: return '';
    }
  }

  onGoogleSignIn(){
  // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //   (res)=>{
  //     console.log(res);

    // }
  }
}
