import { NewLoginComponent } from './../new-login/new-login.component';
import { ApplicationServiceService } from '../core/Service/application-service.service';
import { DataStorageService } from '../core/Service/data-storage.service';
import { NotificationService } from '../core/Service/notification.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerInfo } from './../ModelDataClass/customer.model';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  EventEmitter,
  ViewChild,
  Output,
} from '@angular/core';
import { Form, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
// import {MatDialogRef} from '@angular/material/dialog'
import { MainPageComponent } from '../main-page/main-page.component';
import { CustomErrorStateMatcherService } from '../core/Service/custom-error-state-matcher.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css'],
})
export class NewRegisterComponent implements OnInit {
  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  @Output() userEmail =  new EventEmitter<string>()
  @Output() userPass =  new EventEmitter<string>()

  submittedError: any;
  formStatus: Form;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  isCheckBoxSelected: boolean;
  error: any;
  isAuthorize: boolean;
  email: any;
  pass: any;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: DataStorageService,
    private router: Router,
    private applicationService: ApplicationServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.email = '';
    this.pass = ''
  }

  customErrorStateMatcher: CustomErrorStateMatcherService = new CustomErrorStateMatcherService();

  register = new FormGroup({

    name : new FormControl('', [Validators.required,  Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    phoneNumber :  new FormControl(null,  [Validators.required,
    Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]),

  })

  ngOnInit(): void {
    this.spinner.show();
  }

  onReset(userForm: any) {
    userForm.reset();
  }

  back(){
    this.dialog.open(NewLoginComponent, {
      height: '650px',
      width: '800px'
   });
  }

  onSignUp() {
    this.userEmail.subscribe(email =>{
      this.email = email;
    })

    this.userPass.subscribe(pass =>{
      this.pass = pass;
    })

    // this.dialog.open(this.secondDialog);
    this.authService.signUp(this.email, this.pass).subscribe(
      (value) => {
        console.log(value);
          this.dialog.open(this.secondDialog);

      },
      (errorRes) => {

        this.isAuthorize = true;
          switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            this.error =
              'The email address is already in use by another account.';
            break;

          case 'ADMIN_ONLY_OPERATION':
            this.error =
              'Some functions are managed by Admin.';
            break;

          case 'OPERATION_NOT_ALLOWED':
            this.error = 'Password sign-in is disabled for this project.';
            break;

          case 'MISSING_PASSWORD':
            this.error = 'Password Missing or Used by another account';
            break;

          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            this.error =
              'We have blocked all requests from this device due to unusual activity. Try again later';
          }
        }
    );
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {

    this.formStatus = this.register.value
    this.userEmail.emit(this.register.value.email);
    this.userPass.emit(this.register.value.password);
    this.applicationService.nameEvent.emit(this.formStatus);
  }

  onSubmitLoginPage() {
    // this.applicationService.nameEvent.emit(this.customer.name);
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

  getFormControlName(controlName: string): FormControl
  {
    return this.register.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string)
  {
    switch(controlName)
  {
    case "name":
      if(errorType === "required"){
        return "*Name is required";
      }
      else if(errorType ==="maxlength"){
        return "*Name can contain up to 30 characters only"
      }
      // else if(errorType === "pattern")
      // {
      //   return "*Name can contain alphabets or dot(.) or space only"
      // }
      else{
        return "";
      }

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

     case "phoneNumber":
        if(errorType === "required"){
          return "*PhoneNumber is required"
        }
        else if(errorType === "minlength"|| errorType === "maxlength"){
          return "*Length should be less than or equal to 10"
        }
        else{
          return "";
        }

      case "password":
        if(errorType === "required")
        {
          return "*Password is required"
        }
        else if(errorType === "minlength"){
          return "*Length should be greater than or equal to 8"
        }
        else{
          return "";
        }
        default: return "";
    }
  }
}

