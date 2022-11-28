/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationService } from './../../core/Service/applicationService.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Chart } from 'angular-highcharts';
import { columnChartOptions } from 'src/app/dataChart/columnChart';
import { CartService } from 'src/app/core/Service/cart.service';
import { ClothService } from 'src/app/core/Service/cloth.service';
import { NotificationService } from 'src/app/core/Service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css'],
})
export class ClothesDetailComponent implements OnInit {
  listOfItems: any[] = [];
  dataItem: any = {};
  star: any;
  starData: any[] = [];
  allDetails = true;
  showFlagSpinner = true;
  aboutBrand = false;
  user: any;
  fullName: any;
  updateCount = 0;
  customerReview = false;
  addToCartItem: any[] = [];
  isItemPresent = true;
  columnChart: Chart = new Chart(columnChartOptions);

  constructor(
    private notificationService: NotificationService,
    private cartService: CartService,
    private clothService: ClothService,
    public applicationService: ApplicationService,
    private router: Router
  ) {
    setTimeout(() => {
      this.showFlagSpinner = false;
    }, 3000);
    this.showFlagSpinner = true;

    if (localStorage.getItem('NOTIFY_COUNT')) {
      this.updateCount = JSON.parse(localStorage.getItem('NOTIFY_COUNT') as any);
    }

    if (localStorage.getItem('loginUser')) {
      this.user = JSON.parse(localStorage.getItem('loginUser') as string);
      this.fullName = this.user[0].name.split(' ');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('SELECTED_DATA')) {
      const data = JSON.parse(localStorage.getItem('SELECTED_DATA') as string);
      this.dataItem = data;
      this.listOfItems.push(data);
      console.log(this.listOfItems);
      this.listOfItems = _.castArray(data); // Convert Object into Array directly
      this.star = this.dataItem.rating;
      for (let i = 0; i < this.star; i++) {
        this.starData.push(this.star);
      }
    }
    this.updateCartItems();
  }

  updateCartItems(): boolean{
    if(localStorage.getItem('cartItem') !== '[]'){
      const data = JSON.parse(localStorage.getItem('cartItem') as any);
      data.forEach((element: any) => {
        if(element.id === this.dataItem.id){
          this.isItemPresent = false;
        }
        return true;
      });
    }
    return false;
  }
  updateNotifyCount(count: any) {
    // console.log(count);
  }

  getMyProductItem(product:any, productId: any){
    this.cartService.uploadCartItem(product, productId);
    this.cartService.productList.subscribe((data) => {
      this.noDuplicate(data);
    });
  }

  addToCart(item: any) {

    console.log(this.updateCartItems());

    if(localStorage.getItem('cartItem') !== '[]'){
      const data = JSON.parse(localStorage.getItem('cartItem') as any);
      data.forEach((element: any) => {
        if(element.id === item.id){
          this.isItemPresent = false;
          this.goToCart(item);
        }
        else{
          this.updateCartItems();
          this.getMyProductItem(item, item.id);
        }
      });
    }
    else{
      this.updateCartItems();
      this.getMyProductItem(item, item.id);
    }
    // if(localStorage.getItem('cartItem')){
    //   const dataLength = JSON.parse(localStorage.getItem('cartItem')as string);
    //   if(dataLength.length === filteredData.length){
    //     this.updateCount = this.updateCount + 1;
    //     console.log('Update Count', this.updateCount);
    //   }
    // }
  }

  noDuplicate(applicationData: any) {
    const nonDuplicatedData: any = [];

    applicationData.forEach((x: any) => {
      nonDuplicatedData[x.id] = x;
    });

    const filteredData = nonDuplicatedData.filter((n: undefined) => {
      return n != undefined;
    });
    localStorage.setItem('cartItem', JSON.stringify(filteredData));
    // this.notificationService.showNotification('Item Present in the cart. Please go the cart page', 'Close');
  }

  goToCart(item: any) {
    this.notificationService.showNotification('Redirected to Cart Page', 'Close');
    this.router.navigate(['addToCart']);
  }

  remove(item: any) {
    this.cartService.removeUploadCartItem(item);
  }

  //chips
  details() {
    this.allDetails = true;
    this.aboutBrand = false;
    this.customerReview = false;
  }

  review() {
    this.aboutBrand = false;
    this.allDetails = false;
    this.customerReview = true;
  }

  brand() {
    this.aboutBrand = true;
    this.allDetails = false;
    this.customerReview = false;
  }
}
