import { NgOptimizedImage } from '@angular/common';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationService } from './../../core/Service/applicationService.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from 'src/app/core/Service/cart.service';
import { ConfirmDialogComponent } from 'src/app/Dialog-Box/confirm-dialog/confirm-dialog.component';
import { DialogDataComponent } from 'src/app/Dialog-Box/dialog-data/dialog-data.component';
import { fade } from '../animationModule/animation.module';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
  animations: [fade]
})
export class AddToCartComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public products: any = [];
  pageLength:any;
  public totalSum = 0;
  isChecked : boolean;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  found: any;
  user:any;
  fullName:any;
  quantityItems = 1;
  updateCount:number;
  obj: never;
  matFlag = false;
  dataSource : MatTableDataSource<any>;
  showFlagSpinner = true;
  displayedColumns: any = ['title', 'productImage', 'description', 'price', 'quantity', 'total', 'remove'];

  originalPrice = 0;

  constructor(public applicationService: ApplicationService, public cd: ChangeDetectorRef,
    public dialog: MatDialog, public cartService: CartService, public router: Router) {

      // setTimeout(() =>{
      //   this.showFlagSpinner = false;
      // },3000);
      // this.cartItemPresent()
      this.showFlagSpinner = true;
      this.getItemClothes();
  }

  getItemClothes(){

    if(localStorage.getItem('cartItem')){
      const data = JSON.parse(localStorage.getItem('cartItem') as any);
      this.products = data;
      console.log(this.products);
      this.updateCount = this.products.length;
      localStorage.setItem('NOTIFY_COUNT', JSON.stringify(this.updateCount));
      this.dataSource = new MatTableDataSource<any>(this.products);
      sessionStorage.setItem('DATA_SOURCE',  JSON.stringify(this.products));
      this.totalSum = this.cartService.getTotalPrice();
      if(this.products.length === 0){
        sessionStorage.clear();
      }
   }
  }

  cartItemPresent(){
    if(localStorage.getItem('ITEM_ADDED')){
      const data = JSON.parse(localStorage.getItem('ITEM_ADDED') as any);
      this.products = data;
      this.dataSource = new MatTableDataSource<any>(this.products);
    }
  }

  ngAfterViewInit(): void {
    this.matFlag = true;
    this.dataSource.paginator = this.paginator;
    this.pageLength = this.dataSource.filteredData.length;
    this.cd.detectChanges();
  }

  ngOnInit(): void {

    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }
  }

  getMyItemDetails(id: any){
    this.cartService.getProduct().subscribe((data:any) =>{
      console.log(data);
      data.forEach((element:any) => {
        if(element.id === id){
          this.originalPrice = element.price;
        }
      });
    });
  }

  onAdd(item: any, index: any){

  this.getMyItemDetails(index);
  const objectData: any[]=[];
  const loggedInUser = JSON.parse(localStorage.getItem('cartItem') as string);
  loggedInUser.forEach((element:any) => {
    if(element.id === index){
      const tmpObject = element;
      if(tmpObject.price > 0){
        tmpObject.quantity = tmpObject.quantity + 1;
        tmpObject.price += this.originalPrice;
        tmpObject.total += this.originalPrice;
        objectData.push(tmpObject);
      }
    }
    else{
      objectData.push(element);
    }
  });
  localStorage.setItem('cartItem', JSON.stringify(objectData));
  this.getItemClothes();
}

onSubtract(item: any, index: any){

  this.getMyItemDetails(index);
  const objectData: any[] = [];
  const loggedInUser = JSON.parse(localStorage.getItem('cartItem') as string);
  loggedInUser.forEach((element:any) => {
    if(element.id === index){
      const tmpObject = element;
      if(tmpObject.quantity >= 2){
        tmpObject.quantity = tmpObject.quantity - 1;
        tmpObject.price -= this.originalPrice;
        tmpObject.total -= this.originalPrice;
      }
      objectData.push(tmpObject);
    }
    else{
      objectData.push(element);
    }
  });
  localStorage.setItem('cartItem', JSON.stringify(objectData));
  this.getItemClothes();
 }


  sortChange(event: any){
    this.dataSource.sort = this.sort;
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    console.log(this.sortColumn);
    console.log(this.sortDirection);
  }


  setPagination(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageLength = this.dataSource.filteredData.length;
  }


  removeItem(item: any, index: any){

    this.updateCount = this.updateCount - 1;
    const data  =  JSON.parse(localStorage.getItem('cartItem')as string);
    console.log((data), item.id);
    const filtered = data.filter((itemId:any) => itemId.id !== item.id);
    // console.log(filtered);
    localStorage.setItem('cartItem', JSON.stringify(filtered));
    localStorage.setItem('NOTIFY_COUNT', JSON.stringify(this.updateCount));
    this.getItemClothes();
    // this.applicationService.getCartItemDeleted(index).subscribe(data =>{
    // });
      // console.log(data);
    // this.cartService.removeCartItem(item, index);
  }

  onMainPage(){
   this.router.navigate(['mainPage']);
  }

  onEditDetail()
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data :{
        isChecked: 'true',
        isUnChecked: 'false',
      },
      height: '220px',
      width: '480px',
    });

    this.applicationService.checked.subscribe(event =>{
      this.isChecked = event;
      const totalItemPrice = JSON.parse(localStorage.getItem('cartItem') as string);
      let price = 0;
      totalItemPrice.forEach((element:any) => {
        price += element.price;
      });
      console.log(price);
      if(this.isChecked)
      {
        // sessionStorage.setItem('CONFIRM', JSON.stringify(confirmDialog));
       const dialogRef = this.dialog.open(DialogDataComponent, {

          data: {
            itemPrice: price
          },
          height: '600px',
          width: '600px',
        });
      }
      else
      {sessionStorage.removeItem('CONFIRM');}
    });
  }
}
