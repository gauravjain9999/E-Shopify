import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) { }

  showNotification(message: string, buttonText: string)
  {
    this.matSnackBar.open(message, buttonText, {
      duration: 3000,
      panelClass: 'success-message',
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
