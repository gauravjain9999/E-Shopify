import { ApplicationService } from './../../core/Service/applicationService.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../core/Service/notification.service';

@Component({
  selector: 'app-dialog-notify',
  templateUrl: './dialog-notify.component.html',
  styleUrls: ['./dialog-notify.component.css']
})
export class DialogNotifyComponent implements OnInit {

  name: string;
  message: string;
  email: string;
  requestData: any;
  successData: any;

  constructor( private notificationService: NotificationService,  private spinner:NgxSpinnerService,
  private applicationService: ApplicationService,  private dialogRef: MatDialogRef<DialogNotifyComponent>){}

  ngOnInit(): void {
    this.message = 'You subscribed to get our newly data feed'
  }

  notifyForm = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
    name: new UntypedFormControl('', Validators.required),
  });


  close(){
    this.dialogRef.close();
  }

  onCancel(){
    this.close();
  }


  onSubmit(){

    this.email = this.notifyForm.value.email;
    this.name = this.notifyForm.value.name;
    this.requestData = {

    email: this.email,
    name:  this.name,
    message: this.message
   }

    this.applicationService.getNotify(this.requestData).subscribe(data =>{

    this.successData = data;
    if(this.successData.ok){
        // setTimeout(()=>{
        //   this.spinner.show();
        // }, 2000)
        this.dialogRef.close();
        this.notificationService.showNotification('You are Subscribed now !', 'Close');
      }
    },
    (error) =>{
      this.notificationService.showNotification(error.error.error, 'Close');
    });
  }
}
