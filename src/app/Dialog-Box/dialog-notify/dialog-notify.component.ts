import { ApplicationServiceService } from '../../core/Pipe/Service/application-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../core/Pipe/Service/notification.service';

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

  constructor( private notificationService: NotificationService,  private spinner:NgxSpinnerService,  private applicationService: ApplicationServiceService,  private dialogRef: MatDialogRef<DialogNotifyComponent>)
  {}

  ngOnInit(): void {

    this.message = 'You subscribed to get our newly data feed'
  }

  notifyForm = new FormGroup({

    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
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

    this.email = this.notifyForm.value.email;
    this.name = this.notifyForm.value.name;
    this.requestData = {

      email: this.email,
      name:  this.name,
      message: this.message
    }

    this.applicationService.getNotify(this.requestData).subscribe(data =>{

      this.successData = data;
      if(this.successData.ok)
      {
        // setTimeout(()=>{
        //   this.spinner.show();
        // }, 2000)
        this.dialogRef.close();
        this.notificationService.showNotification('You are Subscribed now !', 'Close');
      }
    }, (error) =>{
      this.notificationService.showNotification(error.error.error, 'Close');
    });
  }
}
