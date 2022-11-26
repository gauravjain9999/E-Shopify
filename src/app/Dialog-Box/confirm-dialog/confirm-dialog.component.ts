import { ApplicationService } from './../../core/Service/applicationService.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dataCheck: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  private router:Router, private applicationService: ApplicationService){

    this.dataCheck = data;
  }

  ngOnInit(): void {
    // This is intentional
  }

  onClick(check: any){
    
    this.dialogRef.close();
    if(check.isChecked){
     this.applicationService.checked.emit(check);
    }
  }

  onCancel()
  {
    this.dialogRef.close();
  }
}
