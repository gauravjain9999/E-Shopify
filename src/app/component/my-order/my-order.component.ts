import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/core/Service/cart.service';
import { NotificationService } from 'src/app/core/Service/notification.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('td') cells: QueryList<ElementRef>;

  public products : any = [];
  dashBoardGridCol: number = 2;
  public totalSum : number = 0;
  flag:boolean;
  showFlagSpinner : boolean = true;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  pageLength: number;
  defaultFlag: boolean = true;
  myWhishList: boolean = false;
  showCards: boolean = true;
  displayedColumns: string[] = ['title', 'description', 'price', 'image', 'remove'];
  dataSource = new MatTableDataSource<any>();
  applicationData: any = [];

  constructor(@Inject(NgZone) private zone: NgZone, private mediaObserver: MediaObserver, private notificationService: NotificationService,
  private cdr: ChangeDetectorRef, private cartService: CartService, private router: Router) {
   }

  ngOnInit(): void {

    this.zone.runOutsideAngular(() =>{
    })

    // sessionStorage.getItem()
    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)

    this.showFlagSpinner = true;
    this.cartService.getProduct().subscribe(res=>{
    this.products = res;
    console.log(this.products);
    this.totalSum = this.cartService.getTotalPrice();
    this.dataSource =  new MatTableDataSource<any>(this.products);
    console.log(this.dataSource.filteredData);
    this.cdr.detectChanges();
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.sort);
    this.dataSource.paginator = this.paginator;
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

  onKeydown(e: any) {
    let cellsArray= this.cells.toArray();
    const idx = cellsArray.findIndex(z => z.nativeElement === e.target);
    cellsArray[idx+1].nativeElement.focus();
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
