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

  defaultValue = null;
  identification ='Select Default Value';
  isFill= false;
  currentDate: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DialogDataComponent>,
  private router:Router) {}

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
    console.log(e.target.value);
  }

  onSubmit()
  {
    console.log(this.profileForm);
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
