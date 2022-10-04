import { AfterViewChecked, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Chart} from "angular-highcharts";
import { columnChartOptions } from 'src/app/dataChart/columnChart';
import { CartService } from 'src/app/core/Service/cart.service';
import { ClothService } from 'src/app/core/Service/cloth.service';
import { ApplicationServiceService } from 'src/app/core/Service/application-service.service';
import { NotificationService } from 'src/app/core/Service/notification.service';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css']
})
export class ClothesDetailComponent implements OnInit{

  listOfItems: any[]=[];
  dataItem: any;
  star:any;
  starData: any[] = [];
  allDetails: boolean = true;
  showFlagSpinner: boolean = true;
  aboutBrand: boolean = false;
  user:any;
  fullName:any;
  customerReview: boolean = false;
  columnChart: Chart = new Chart(columnChartOptions);

  constructor(private notificationService: NotificationService,  private cartService: CartService,  private clothService: ClothService, private applicationService: ApplicationServiceService) {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)
    this.showFlagSpinner = true;

    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }

  }

  ngOnInit(): void {

    if(sessionStorage.getItem('SELECTED_DATA')){
      let data = JSON.parse(sessionStorage.getItem(('SELECTED_DATA')) as string);
      console.log(data);
      this.dataItem = data;
      this.listOfItems.push(data);
      this.listOfItems = _.castArray(data); // Convert Object into Array directly
      this.star = this.dataItem.rating;
      for(let i =0; i<this.star; i++){
        this.starData.push(this.star);
      }
    }
  }

  addToCart(item: any){
    this.cartService.uploadCartItem(item);
    this.notificationService.showNotification('Item Added In Cart', 'Close');
  }

  remove(item: any){
    this.cartService.removeUploadCartItem(item)
  }

  //chips
  details(){
    this.allDetails= true;
    this.aboutBrand= false;
    this.customerReview= false;
  }

  review(){
    this.aboutBrand= false;
    this.allDetails= false;
    this.customerReview= true;
  }

  brand(){
    this.aboutBrand= true;
    this.allDetails= false;
    this.customerReview= false;
  }
}
