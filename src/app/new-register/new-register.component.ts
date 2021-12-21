import { Router } from '@angular/router';
import { NgxSpinnerService} from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerInfo } from './../ModelDataClass/customer.model';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import {MatDialogRef} from '@angular/material/dialog'
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css']
})
export class NewRegisterComponent implements OnInit {

  @ViewChild('secondDialog') secondDialog : TemplateRef<any>;;

  submittedError: any;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  isCheckBoxSelected:boolean=false;
  customer : CustomerInfo = new CustomerInfo();
  constructor(private dialog: MatDialog, private router: Router,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.spinner.show();

    this.customer = {
      name: '',
      email: '',
      password: '',
      phoneNumber: ''
    }
  }

  onReset(userForm: NgForm)
  {
    userForm.reset();
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  onSubmit(form: NgForm)
  {
   this.dialog.open(this.secondDialog)
   console.log(form);
  }

  onSubmitLoginPage()
  {
    this.router.navigate(['mainPage']);
    this.spinner.show();
    this.closeAlertBox();
  }
  checkboxChanged()
  {
    this.isCheckBoxSelected=!this.isCheckBoxSelected;
  }
  closeAlertBox()
  {
    this.dialog.closeAll();
  }


}
