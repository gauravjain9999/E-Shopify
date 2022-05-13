import { ApplicationServiceService } from '../core/Service/application-service.service';
import { CartService } from '../core/Service/cart.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ClothService } from '../core/Service/cloth.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import * as _ from 'lodash';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  @ViewChild('focus', {static: false}) input: ElementRef;
  @Output() searchData = new EventEmitter();
  listOfClothesItem: any;
  SearchText: any;
  filtered: any;
  totalLength: any;
  page: number = 1;
  myIndex=0;
  count = 0;
  showMe: boolean = true;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  flag= true;

  // MatPaginator Output
  pageEvent: PageEvent;
  show: {[key: number]: boolean} = {};

  constructor(private applicationService: ApplicationServiceService, private clothesService: ClothService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.listOfClothesItem = this.clothesService.getListOfCloth();
    this.totalLength = this.listOfClothesItem.length;
    // console.log(this.listOfClothesItem);
    // console.log('Length is ', this.totalLength);
    this.listOfClothesItem.forEach((element:any) => {
      Object.assign(element, {quantity:1, total:element.price})
    });
  }


  itemClothDetails(item: any, index: any)
  {
    // let currItemData = sessionStorage.setItem('TEMP_DATA', JSON.stringify(item));
    this.router.navigate(['clothesDetails'])
    // this.applicationService.applicationData.emit(item);
    this.applicationService.eventData.next(item);
    // this.applicationService.submitData.next(item);
  }

  addToCart(item: any)
  {
    this.flag=false;
    item.isCartVisible = true;
    // this.input.nativeElement.focus();
    // console.log(index);
    // this.showMe = !this.showMe;
    // this.show[index] = true;
    // console.log(this.show[index]);
  }

  onAdd(item: any, index: any)
  {
    this.cartService.addToCart(item, index);
    item.itemAdd++;
  }

  onSubtract(item: any, index:any)
  {
    this.cartService.removeCartItem(item, index)
    if(item.itemAdd > 0)
    {
      item.itemAdd--;
    }
  }
}
