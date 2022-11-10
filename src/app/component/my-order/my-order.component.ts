import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/core/Service/cart.service';
import { NotificationService } from 'src/app/core/Service/notification.service';
import { fade } from '../animationModule/animation.module';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  animations: [fade]
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
  user:any;
  updateOrderCount:any;
  fullName:any;

  constructor(@Inject(NgZone) private zone: NgZone, private mediaObserver: MediaObserver, private notificationService: NotificationService,
  private cdr: ChangeDetectorRef, private cartService: CartService, private router: Router) {

    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }
  }

  ngOnInit(): void {

    this.zone.runOutsideAngular(() =>{})

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)

    this.showFlagSpinner = true;
    this.cartService.getProduct().subscribe(res=>{
    this.products = res;
    this.updateOrderCount = this.products.length;
    this.totalSum = this.cartService.getTotalPrice();
    this.dataSource =  new MatTableDataSource<any>(this.products);
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
    if(this.dataSource.paginator !== undefined){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    }
  }

  sortChange(event: any){
    this.dataSource.sort = this.sort;
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  myOrders(){
    this.flag = true;
    this.defaultFlag = false;
    this.myWhishList = false;

    if(this.products.length === 0){
      this.myFav();
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

  redirectToDashboard(){
    this.router.navigate(['mainPage']);
    this.notificationService.showNotification('Redirected To Main Dashboard', 'Close');
  }

  removeItem(item: any, index: any){
    this.cartService.removeCartItem(item, index);
  }
}
