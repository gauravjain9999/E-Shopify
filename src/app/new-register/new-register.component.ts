import { ApplicationServiceService } from './../Service/application-service.service';
import { DataStorageService } from './../Service/data-storage.service';
import { NotificationService } from './../Service/notification.service';
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
import { Form, NgForm } from '@angular/forms';
// import {MatDialogRef} from '@angular/material/dialog'
import { MainPageComponent } from '../main-page/main-page.component';

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
  customer: CustomerInfo = new CustomerInfo();

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private authService: DataStorageService,
    private router: Router,
    private applicationService: ApplicationServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.customer = {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    };
  }

  onReset(userForm: NgForm) {
    userForm.reset();
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
  onSubmit(form: NgForm) {
    console.log(form);
    this.formStatus = form
    this.userEmail.emit(form.value.email);
    this.userPass.emit(form.value.password);
    this.applicationService.nameEvent.emit(this.formStatus);

    console.log(form);

    // const email = form.value.email;
    // const pass = form.value.password;

  }

  onSubmitLoginPage() {
    this.applicationService.nameEvent.emit(this.formStatus);
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
}

