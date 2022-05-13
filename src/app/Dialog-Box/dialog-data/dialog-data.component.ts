import { CustomErrorStateMatcherService } from '../../core/Service/custom-error-state-matcher.service';
import { Router } from '@angular/router';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { PaymentCheckoutComponent } from 'src/app/Dialog-Box/payment-checkout/payment-checkout.component';

export class DialogData{

  name:string;
  mobileNum:string;
  address:string;
  state: string;
  city:string;
  date:string;
  payment:string;
  location:string;
}

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent implements OnInit{

  defaultValuePayment: any;
  identification ='Select Default Value';
  isFill= false;
  states: any;
  minLength = 10;
  // newDate = new Date();
  selectedPayment = ['UPI', 'Cash On Delivery', 'Credit Card'];
  myState = ['Mumbai', 'Rajasthan', 'Delhi', 'Bangalore', 'Goa', 'Gujarat', 'Uttar Pradesh', 'Haryana', 'Kolkata', 'Punjab'];
  currentDate: string;
  filterdOptions: any[]=[];
  selectedUser: any;
  flag = false;
  dateHint= 'Choose date from Here';
  minDate: Date = new Date("1950-01-01");
  maxDate: Date = new Date("2030-01-01");


  customErrorStateMatcher: CustomErrorStateMatcherService = new CustomErrorStateMatcherService();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DialogDataComponent>,
  private router:Router, private paymentDialog: MatDialog) {

  }

  ngOnInit(): void {
    //comment date
    this.currentDate = moment().format('YYYY-MM-DD');
  }

  // dateFilter(date:any)
  // {
  //   return date && date.getday()!==0 && date.getDay()!==6;
  // }

  // Validators.pattern('^[A-Za-z]*$') Do not Contain Space or Dot

  profileForm = new FormGroup({
    name:        new FormControl(null,  [Validators.required, Validators.maxLength(30)]),
    email:       new FormControl(null,  [Validators.required, Validators.email]),
    location:    new FormControl('' ,   [Validators.required]),
    date:        new FormControl(null,  Validators.required),
    payment:     new FormControl(null,  [Validators.required]),
    state:       new FormControl(null,  Validators.required),
    city:        new FormControl(null,  Validators.required),
    phoneNumber: new FormControl(null,  [Validators.required,
    Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]),
    address:     new FormControl(null,  [Validators.required]),
  });


  onSelectedPayment(payment: any){
    this.defaultValuePayment = payment;
  }


  onDateChange()
  {
    if(this.profileForm.value.date){
      let date = new Date(this.profileForm.value.date);
      this.dateHint = `You Selected your Delivery on ${date.toLocaleDateString()}`
      //getting or return First Word of the Day
      //this.dateHint = `You Selected your Delivery on ${date.toString().substr(0, date.toString().indexOf(" "))}`
    }
    else{
      this.dateHint = "Choose date from Here"
    }
  }

  submit()
  {
    console.log(this.profileForm.value);
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onClick(item: any){
   this.states = item;
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.profileForm.valid)
    {
      this.flag = true;
      this.dialogRef.close();
      this.paymentDialog.open(PaymentCheckoutComponent, {
        height: '800px',
        width: '800px'
      })
      // this.router.navigate(['payment'])
    }
    else{
      alert('Please fill your details');
      this.flag = false;
    }
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

  getFormControlName(controlName: string): FormControl{
    return this.profileForm.get(controlName) as FormControl;
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

    case "location":
      if(errorType === "required"){
        return "*Location is required"
      }
      else{
        return "";
      }

      case "payment":
        if(errorType === "required"){
          return "*Payment is required"
        }
        else{
          return "";
        }

      case "date":
        if(errorType === "required"){
          return "*Date is required"
        }
        else{
          return "";
        }

      case "state":
        if(errorType === "required"){
          return "*State is required"
        }
        else{
          return "";
        }

      case "city":
        if(errorType === "required")
        {
          return "*City is required"
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

      case "address":
        if(errorType === "required")
        {
          return "*Address is required"
        }
        else{
          return "";
        }
        default: return "";
    }
  }
}
