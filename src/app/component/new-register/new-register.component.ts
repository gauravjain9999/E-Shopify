import { ApplicationService } from './../../core/Service/applicationService.service';
import { NewLoginComponent } from './../new-login/new-login.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  Form,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/Service/notification.service';
import { CustomErrorStateMatcherService } from 'src/app/core/Service/custom-error-state-matcher.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css'],
})
export class NewRegisterComponent implements OnInit {
  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;
  submittedError: any;
  formStatus: Form;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  isCheckBoxSelected: boolean;
  error: any;
  isAuthorize: boolean;

  email: any;
  pass: any;
  userName: string;
  phoneNumber: number;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<NewRegisterComponent>,
    private applicationService: ApplicationService,
    private spinner: NgxSpinnerService,
  ) {
    this.email = '';
    this.pass = '';
  }

  customErrorStateMatcher: CustomErrorStateMatcherService =
    new CustomErrorStateMatcherService();

  registerUser = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneNumber: new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.minLength(10),
    ]),
  });

  ngOnInit(): void {
    this.spinner.show();
  }

  onReset(userForm: any) {
    userForm.reset();
  }

  back() {
    this.dialog.open(NewLoginComponent, {
      height: '650px',
      width: '800px',
    });
    this.dialogRef.close();
  }

  keyPressNumbers(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.formStatus = this.registerUser.value;
    this.email = this.registerUser.value.email;
    this.pass = this.registerUser.value.password;
    this.phoneNumber = this.registerUser.value.phoneNumber;
    this.userName = this.registerUser.value.name;

    sessionStorage.setItem('USER_DETAILS', JSON.stringify(this.formStatus));
    if (this.registerUser.valid) {
      this.applicationService.signUpUser(this.formStatus).subscribe((res) => {
        if (res) {
          this.notificationService.showNotification(
            'New User Register',
            'Close'
          );
          this.back();
        }
      });

      // this.userDataStore.signUp(this.email, this.pass).subscribe(
      //   (value) => {
      //     this.dialog.open(this.secondDialog);
      //   },
      //   (errorRes) => {

      //     this.isAuthorize = true;

      //     switch (errorRes.error.error.message) {

      //       case 'EMAIL_EXISTS':
      //        this.notificationService.showNotification('The email address is already in use by another account', 'close')
      //        break;

      //       case 'ADMIN_ONLY_OPERATION':
      //         this.notificationService.showNotification('Some functions are managed by Admin', 'close')
      //         break;

      //       case 'OPERATION_NOT_ALLOWED':
      //         this.notificationService.showNotification('Password sign-in is disabled for this project', 'close')
      //         break;

      //       case 'MISSING_PASSWORD':
      //         this.notificationService.showNotification('Password Missing or Used by another account', 'close')
      //         break;

      //       case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      //         this.notificationService.showNotification('We have blocked all requests from this device due to unusual activity. Try again later', 'close')
      //         break;
      //       }
      //     });
    } else {
      this.notificationService.showNotification(
        'Please complete your Details First before Proceed',
        'Close'
      );
    }
    this.applicationService.nameEvent.emit(this.formStatus);
  }

  onSubmitLoginPage() {
    this.applicationService.authRedirectData.emit(true);
    this.router.navigate(['mainPage']);
    this.spinner.show();
    this.closeAlertBox();
  }

  checkboxChanged() {
    this.isCheckBoxSelected = !this.isCheckBoxSelected;
  }

  closeAlertBox() {
    this.dialog.closeAll();
    this.notificationService.showNotification('Register Successfully', 'Close');
  }

  getFormControlName(controlName: string): UntypedFormControl {
    return this.registerUser.get(controlName) as UntypedFormControl;
  }

  getErrorMessage(controlName: string, errorType: string) {
    switch (controlName) {
      case 'name':
        if (errorType === 'required') {
          return '*Name is required';
        } else if (errorType === 'maxlength') {
          return '*Name can contain up to 30 characters only';
        }
        // else if(errorType === "pattern")
        // {
        //   return "*Name can contain alphabets or dot(.) or space only"
        // }
        else {
          return '';
        }

      case 'email':
        if (errorType === 'required') {
          return ' *Email is required';
        } else if (errorType === 'email') {
          return '*Email should be in Correct Format.Eg: someone@example.com';
        } else {
          return '';
        }

      case 'phoneNumber':
        if (errorType === 'required') {
          return '*PhoneNumber is required';
        } else if (errorType === 'minlength' || errorType === 'maxlength') {
          return '*Length should be less than or equal to 10';
        } else {
          return '';
        }

      case 'password':
        if (errorType === 'required') {
          return '*Password is required';
        } else if (errorType === 'minlength') {
          return '*Length should be greater than or equal to 8';
        } else {
          return '';
        }
      default:
        return '';
    }
  }
}
