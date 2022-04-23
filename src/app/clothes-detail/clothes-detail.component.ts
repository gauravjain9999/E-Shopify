import { ApplicationServiceService } from './../Service/application-service.service';
import { ClothService } from './../Service/cloth.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css']
})
export class ClothesDetailComponent implements OnInit{

  listOfItems: any = {};
  dataItem: any;
  star:any;
  starData: any[] = [];
  allDetails: boolean = true;
  aboutBrand: boolean = false;
  customerReview: boolean = false;

  // details 


  constructor(private cartService: CartService,  private clothService: ClothService, private applicationService: ApplicationServiceService) {
  }

  ngOnInit(): void {

    this.applicationService.eventData.subscribe(data =>{
      console.log(data);
      this.dataItem = data;
      //  this.listOfItems = _.castArray(data); // Convert Object into Array directly
      this.star = this.dataItem.rating;
      for(let i =0; i<this.star; i++){
        this.starData.push(this.star);
      }
    });
  }

  addToCart(item: any)
  {
    this.cartService.uploadCartItem(item);
  }

  remove(item: any)
  {
    this.cartService.removeUploadCartItem(item)
  }

  //chips
  details()
  {
    this.allDetails= true;
    this.aboutBrand= false;
    this.customerReview= false;
  }

  review()
  {
    this.aboutBrand= false;
    this.allDetails= false;
    this.customerReview= true;
  }

  brand()
  {
    this.aboutBrand= true;
    this.allDetails= false;
    this.customerReview= false;
  }
}
