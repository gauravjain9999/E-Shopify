import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/Service/user.service';

@Component({
  selector: 'app-mobile-products',
  templateUrl: './mobile-products.component.html',
  styleUrls: ['./mobile-products.component.css'],
})
export class MobileProductsComponent implements OnInit {

  categoryCloth :any[]=[];
  topBrandClothList : any[] = [];
  sliderValue = 0;
  min = 100;
  customerRating: any[] = [];
  max = 1000;
  searchText: any;

  constructor(private service: UserService)
  {

  }


  ngOnInit(): void
  {
    this.categoryCloth = this.service.getClothes();
    this.topBrandClothList = this.service.topBrandClothes();
    this.customerRating = this.service.customerRating();
  }

}
