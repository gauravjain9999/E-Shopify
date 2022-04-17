import { Router } from '@angular/router';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

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
  selectedPayment = ['UPI', 'Cash On Delivery', 'Credit Card'];
  myState = ['Mumbai', 'Rajasthan', 'Delhi', 'Bangalore', 'Goa', 'Gujarat', 'Uttar Pradesh', 'Haryana', 'Kolkata', 'Punjab'];
  currentDate: string;
  filterdOptions: any[]=[];
  selectedUser: any;
  flag = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DialogDataComponent>,
  private router:Router) {

  }

  ngOnInit(): void {
    //comment date
    this.currentDate = moment().format('YYYY-MM-DD');
  }

  profileForm = new FormGroup({
    name:        new FormControl('',  Validators.required),
    email:       new FormControl('',  [Validators.required, Validators.email]),
    location:    new FormControl('' , [Validators.required]),
    date:        new FormControl(new Date(),  Validators.required),
    payment:     new FormControl('',  [Validators.required]),
    state:       new FormControl('',  Validators.required),
    city:        new FormControl('',  Validators.required),
    phoneNumber: new FormControl('',  [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]),
    address:     new FormControl('',  [Validators.required]),
  });

  changeWebsite(e:any)
  {

  }

  onSelectedPayment(payment: any){
    this.defaultValuePayment = payment;
  }

  onSubmit()
  {
    console.log(this.profileForm);
  }

  onKeyUp(value: any)
  {
    console.log(value);
  }

  onClick(item: any)
  {
   this.states = item;
  }


  onCancel()
  {
    this.dialogRef.close();
  }

  onPayment()
  {
    setTimeout(()=>{
      this.router.navigate(['payment']);
      this.dialogRef.close();
    }, 1000)
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
}
