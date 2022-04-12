import { DialogNotifyComponent } from '../../Dialog-Box/dialog-notify/dialog-notify.component';
import { DialogDataComponent } from '../../Dialog-Box/dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../Service/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../Service/notification.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  searchText: any;
  opened = false;
  email: string;
  public totalItem: number = 0;

  constructor( private dialog: MatDialog,  private cartService: CartService, private notificationService: NotificationService) {

   this.cartService.getProduct().subscribe(res =>{
   this.totalItem = res.length;
  })
}

close(event: any) {
  this.sidenav.close();
}






  ngOnInit(): void {
  }

  showNotify()
  {
    console.log(this.totalItem);
    this.totalItem === 0 ? this.notificationService.showNotification('No Items Added', 'close'): this.notificationService.showNotification('Item Added', 'close');
  }

  notification()
  {
    this.dialog.open(DialogNotifyComponent, {
      width: '420px',
      height: '380px'
    });
  }

}
