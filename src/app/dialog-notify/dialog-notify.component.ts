import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-notify',
  templateUrl: './dialog-notify.component.html',
  styleUrls: ['./dialog-notify.component.css']
})
export class DialogNotifyComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogNotifyComponent>)
  {

  }

  ngOnInit(): void {

  }

  notifyForm = new FormGroup({

    email: new FormControl(''),
    address: new FormControl(''),
  });


  close()
  {
    this.dialogRef.close();
  }

  onCancel()
  {
    this.close();
  }


  onSubmit()
  {
    console.log(this.notifyForm.value);
  }
}
