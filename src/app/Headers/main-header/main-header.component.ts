import { ApplicationService } from './../../core/Service/applicationService.service';
import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../../Dialog-Box/dialog-notify/dialog-notify.component';
import { DialogDataComponent } from '../../Dialog-Box/dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../core/Service/cart.service';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { NotificationService } from '../../core/Service/notification.service';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/Service/lang.service';
import { Output } from "@angular/core";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnChanges {

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() userName: any;
  @Output() updateNotifyCount = new EventEmitter();
  @Input() notifyUpdate: any;

  languages = [
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'Français'}
  ];
  fullName: any;
  searchText: any;
  loginUserName:any;
  opened = false;
  selectedLang: any;
  name:any;
  email: string;
  dataSource: any[]= [];
  public totalItem: number = 0;
  items: any[] = [];
  supportLanguages = ['en', 'fr'];
  firstName: any;
  selectedOption =  this.languages.filter(item => item.value === 'en')[0].viewValue;

  constructor(
  public translate: TranslateService, private router: Router,public langService: LanguageService,
  private dialog: MatDialog, private applicationService: ApplicationService,
  private cartService: CartService, private notificationService: NotificationService) {

   this.isCartItemPresent();
  //  this.cartService.getProduct().subscribe(res =>{
  //  this.dataSource = res;
  //  this.totalItem = res.length;
  // })
}

  isCartItemPresent(){

  //  if(sessionStorage.getItem('DATA_SOURCE')){
  //   let data: any[] = JSON.parse(sessionStorage.getItem('DATA_SOURCE') as any);
  //   this.dataSource = data;
  //   this.totalItem = this.dataSource.length;
  //  }

  }


  redirectMainPage(){

  if(this.router.url === '/mainPage'){
    this.notificationService.showNotification('You are on the Main Dashboard', 'Close');
   }
   else{
    this.notificationService.showNotification('Redirected To the Dashboard', 'Close');
    this.router.navigate(['mainPage']);
   }
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes['userName']){
      this.fullName = changes['userName'].currentValue;
      this.firstName = this.fullName[0];
      this.name = this.fullName.shift().charAt(0) +  this.fullName.shift().charAt(0);
      this.loginUserName = this.name.toUpperCase();
    }

    if(changes['notifyUpdate']){
      this.totalItem = changes['notifyUpdate'].currentValue;
      this.updateNotifyCount.emit(this.totalItem);
      console.log(this.totalItem);
    }
  }

  ngOnInit(): void {

    this.translate.addLangs(this.supportLanguages);
    this.translate.setDefaultLang('en');
    this.items = ['My Profile', 'My Orders', 'My Wallet'];
  }


  onChange(langValue: any){
    this.selectedLang = langValue.target.value;
    for(const langVal of this.languages){
      if(langVal.viewValue === this.selectedLang){
        this.changeLanguage(langVal.value);
      }
    }
  }

   changeLanguage(val: any) {
    this.translate.use(val);
    this.translate.setDefaultLang(val);
    this.langService.selectedLanguage = val;
  }

  close(event: any) {
    this.sidenav.close();
  }

  openComponent(component: any){

    let openComponent = component;
    if(openComponent === 'My Profile'){
      this.router.navigate(['myProfile'])
    }
    else if(openComponent === 'My Orders'){
      this.router.navigate(['myOrder'])
    }
    else if (openComponent === 'My Wallet'){
      this.router.navigate(['payment'])
    }
  }


  logout(){
    this.router.navigate(['shopifyApp']);
  }

  showNotify()
  {
    console.log(this.totalItem);
    this.totalItem === 0 ? this.notificationService.showNotification('Item Added in cart', 'close'): '';
  }

  notification()
  {
    this.dialog.open(DialogNotifyComponent, {
      width: '420px',
      height: '380px'
    });
  }

}
