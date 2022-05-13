import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationServiceService } from '../core/Service/application-service.service';
import { CartService } from '../core/Service/cart.service';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import { NotificationService } from '../core/Service/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public products : any = [];
  dashBoardGridCol: number = 2;
  public totalSum : number = 0;
  flag:boolean;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  pageLength: number;
  defaultFlag: boolean = true;
  myWhishList: boolean = false;
  displayedColumns: string[] = ['title', 'description', 'price', 'image', 'remove'];
  dataSource = new MatTableDataSource<any>();

  constructor(private mediaObserver: MediaObserver, private notificationService: NotificationService,
  private cdr: ChangeDetectorRef, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.getProduct().subscribe(res=>{
    this.products = res;
    this.totalSum = this.cartService.getTotalPrice();
    this.dataSource =  new MatTableDataSource<any>(this.products);
    console.log(this.dataSource.filteredData);
    this.pageLength = this.dataSource.filteredData.length;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
  });

    this.dataSource.sort = this.sort;
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.paginator);
  }

  sortChange(event: any){
    this.dataSource.sort = this.sort;
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    console.log(this.sortColumn);
    console.log(this.sortDirection);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
