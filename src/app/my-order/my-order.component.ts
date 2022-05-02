import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationServiceService } from '../Service/application-service.service';
import { CartService } from '../Service/cart.service';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import { NotificationService } from '../Service/notification.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  public products : any = [];
  dashBoardGridCol: number = 2;
  public totalSum : number = 0;
  flag:boolean;
  defaultFlag: boolean = true;
  myWhishList: boolean = false;

  constructor( private mediaObserver: MediaObserver, private notificationService: NotificationService,  private applicationService: ApplicationServiceService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.getProduct().subscribe(res=>{
      this.products = res;
      this.totalSum = this.cartService.getTotalPrice();
    });

    this.mediaObserver.asObservable().subscribe((media: MediaChange[])=>{

      if(media.some(mediaChange => mediaChange.mqAlias="Gt-m")){
        this.dashBoardGridCol = 2;
      }
      else{
        this.dashBoardGridCol = 2;
      }
      console.log(media);
    })
  }

  myOrders(){

    this.flag = true;
    this.defaultFlag = false;
    this.myWhishList = false;

    if(this.products.length ==0){
      this.notificationService.showNotification('No Data Found', 'Close');
    }
  }

  myFav(){
    this.myWhishList = true;
    this.flag = false;
    this.defaultFlag = false;
  }

  removeItem(item: any, index: any){
    console.log(item);
    this.cartService.removeCartItem(item, index);
  }



}
