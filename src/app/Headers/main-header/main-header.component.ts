import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../../Dialog-Box/dialog-notify/dialog-notify.component';
import { DialogDataComponent } from '../../Dialog-Box/dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../core/Service/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../core/Service/notification.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ApplicationServiceService } from 'src/app/core/Service/application-service.service';

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
  items: any[] = [];

  constructor(private router: Router, private dialog: MatDialog, private applicationService: ApplicationServiceService,
  private cartService: CartService, private notificationService: NotificationService) {

   this.cartService.getProduct().subscribe(res =>{
   this.totalItem = res.length;
   console.log(this.totalItem);
  })
}
  ngOnInit(): void {
    this.items = ['My Profile', 'My Orders', 'My Wallet'];
  }

  close(event: any) {
    this.sidenav.close();
  }

  openComponent(component: any){

    let openComponent = component;
    if(openComponent === 'My Profile'){
      this.router.navigate(['myProfile'])
    }
    else if(openComponent === 'My Orders'){
      this.router.navigate(['myOrder'])
    }
    else if (openComponent === 'My Wallet'){
      this.router.navigate(['payment'])
    }

  }


  logout()
  {
    this.router.navigate(['shopifyApp']);
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
