import { UserService } from './../../core/Service/user.service';
import { ApplicationService } from './../../core/Service/applicationService.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/core/Service/cart.service';
import { ClothService } from 'src/app/core/Service/cloth.service';
import { ShopifyClothesModel } from 'src/app/ModelDataClass/eShopify.model';


@Component({
  selector: 'app-clothes-product',
  templateUrl: './clothes-product.component.html',
  styleUrls: ['./clothes-product.component.css']
})
export class ClothesProductComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('focus', {static: false}) input: ElementRef;
  @Output() searchData = new EventEmitter();
  listOfClothesItem: any;
  SearchText: any;
  filtered: any;
  totalLength: any;
  page = 1;
  myIndex=0;
  count = 0;
  showMe = true;
  length = 100;
  value = 50;
  pageSize = 10;
  pageLength:any;
  dataSource : MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  flag= true;
  showFlagSpinner = true;
  user:any;
  fullName:any;
  colorHeartRed = false;
  colorHeartBlack = true;
  menuButtonItems: any[] =[];
  thumbnail: any;
  updateCount = 0;
  pageEvent: PageEvent;
  show: {[key: number]: boolean} = {};

  constructor(public applicationService: ApplicationService,  private spinner: NgxSpinnerService,
    public clothesService: ClothService, private cartService: CartService, public router: Router,
    private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, private userService: UserService) {

      if(localStorage.getItem('loginUser')){
        this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
        this.fullName = this.user[0].name.split(' ');
      }
      this.menuButtonItems =  this.userService.itemMenuButtons();
    }

  ngAfterViewInit(): void {

    if(this.dataSource !== undefined){
      this.dataSource.paginator = this.paginator;
      this.pageLength = this.dataSource.filteredData.length;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000);

    if(localStorage.getItem('NOTIFY_COUNT') && localStorage.getItem('NOTIFY_COUNT') !== undefined){
      this.updateCount = JSON.parse(localStorage.getItem(('NOTIFY_COUNT')) as '');
    }
    else{
      this.updateCount = 0;
    }

    this.applicationService.getClothesData().subscribe((requestData: ShopifyClothesModel) =>{
    // let objectURL = 'data:image/jpeg;base64,' + data.Image;
    // this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    if(requestData.apiResponseStatus){
      this.listOfClothesItem = requestData.clothesList;
      this.showFlagSpinner = true;
      this.dataSource = new MatTableDataSource<any>(this.listOfClothesItem);
      this.totalLength = this.listOfClothesItem.length;
      this.listOfClothesItem.forEach((element:any) => {
        Object.assign(element, {quantity:1, total:element.price});
      });
    }});
    // this.showFlagSpinner = false;
  }


  favoriteItem(item: any, index: any){

    console.log(item,index);
    this.cartService.favoriteItem(item, index);

    // if(index === 4){
    //   this.colorHeartRed = true;
    //   this.colorHeartBlack = false;
    // }
    // else{
    //   this.colorHeartRed = false;
    //   this.colorHeartBlack = true;
    // }
  }


  itemClothDetails(item: any, index: any){
    this.router.navigate(['clothesDetails']);
    localStorage.setItem('SELECTED_DATA', JSON.stringify(item));
    // this.applicationService.getItemClothesData(index).subscribe((data:any) =>{
    //   let obj = Object.assign({}, ...data);
    //   console.log(obj);
    // });
  }

  // addToCart(item: any)
  // {
  //   this.flag=false;
  //   item.isCartVisible = true;
  //   // this.input.nativeElement.focus();
  //   // console.log(index);
  //   // this.showMe = !this.showMe;
  //   // this.show[index] = true;
  //   // console.log(this.show[index]);
  // }

  // onAdd(item: any, index: any){
  //   this.cartService.addToCart(item, index);
  //   item.itemAdd++;
  // }

  // onSubtract(item: any, index:any)
  // {
  //   this.cartService.removeCartItem(item, index)
  //   if(item.itemAdd > 0)
  //   {
  //     item.itemAdd--;
  //   }
  // }
}
