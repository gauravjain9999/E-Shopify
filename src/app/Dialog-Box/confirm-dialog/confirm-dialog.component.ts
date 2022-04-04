import { ApplicationServiceService } from './../../Service/application-service.service';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../dialog-data/dialog-data.component';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {


  dataCheck: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  private router:Router, private applicationService: ApplicationServiceService){

    this.dataCheck = data;
    console.log(data);
  }

  ngOnInit(): void {
  }

  onClick(check: any)
  {
    if(check.isChecked)
    {
     this.applicationService.checked.emit(check);
    }
  }
  
  onCancel()
  {
    this.dialogRef.close();
  }
}
