import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationServiceService } from 'src/app/core/Service/application-service.service';
import { CartService } from 'src/app/core/Service/cart.service';
import { ClothService } from 'src/app/core/Service/cloth.service';


@Component({
  selector: 'app-clothes-product',
  templateUrl: './clothes-product.component.html',
  styleUrls: ['./clothes-product.component.css']
})
export class ClothesProductComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  value = 50;
  pageSize = 10;
  pageLength:any;
  dataSource : MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  flag= true;
  showFlagSpinner: boolean = true;
  user:any;
  fullName:any;
  colorHeartRed: boolean = false;
  colorHeartBlack: boolean = true;
  menuButtonItems: any[] =[];

  // MatPaginator Output
  pageEvent: PageEvent;
  show: {[key: number]: boolean} = {};

  constructor(private applicationService: ApplicationServiceService,  private spinner: NgxSpinnerService,
    private clothesService: ClothService, private cartService: CartService, public router: Router) {

      if(localStorage.getItem('loginUser')){
        this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
        this.fullName = this.user[0].name.split(' ');
      }

      this.menuButtonItems = [
        { bgColor: 'green',   iconsName: 'WhatsApp', icon: 'fa fa-whatsapp', marginLeft: '22px' },
        { bgColor: 'blue',    iconsName: 'FaceBook', icon: 'fa fa-facebook', marginLeft: '30px' },
        { bgColor: 'skyBlue', iconsName: 'Telegram', icon: 'fa fa-telegram', marginLeft: '20px'  },
      ]

    }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.pageLength = this.dataSource.filteredData.length;
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)

    this.showFlagSpinner = true;
    this.listOfClothesItem = this.clothesService.getListOfCloth();
    this.dataSource = new MatTableDataSource<any>(this.listOfClothesItem);
    this.totalLength = this.listOfClothesItem.length;
    this.listOfClothesItem.forEach((element:any) => {
       Object.assign(element, {quantity:1, total:element.price})
      });
    // this.showFlagSpinner = false;
  }


  favoriteItem(item: any, index: any){


    // if(index === 4){
    //   this.colorHeartRed = true;
    //   this.colorHeartBlack = false;
    // }
    // else{
    //   this.colorHeartRed = false;
    //   this.colorHeartBlack = true;
    // }
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

  onAdd(item: any, index: any){
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
