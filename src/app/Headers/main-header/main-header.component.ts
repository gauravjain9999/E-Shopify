import { ApplicationService } from './../../core/Service/applicationService.service';
import { Router } from '@angular/router';
import { DialogNotifyComponent } from '../../Dialog-Box/dialog-notify/dialog-notify.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../core/Service/cart.service';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { NotificationService } from '../../core/Service/notification.service';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/Service/lang.service';
import { Output } from '@angular/core';
import { GlobalConstant } from 'src/app/core/constant/globalConstant';

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
  globalConstant= GlobalConstant;
  name:any;
  email: string;
  dataSource: any[]= [];
  totalItem = 0;
  items: unknown[] = [];
  supportLanguages = ['en', 'fr'];
  firstName: any;
  selectLang = 'ENGLISH';
  selectedOption =  this.languages.filter(item => item.value === 'en')[0].viewValue;

  constructor(
  public translate: TranslateService, private router: Router, public langService: LanguageService,
  private dialog: MatDialog, private applicationService: ApplicationService,
  private cartService: CartService, private notificationService: NotificationService) {
  
  this.translate.addLangs(this.supportLanguages);
  this.selectLang =  this.langService.languages.filter(item => item.value === translate.getBrowserLang())[0].viewValue;
  translate.setDefaultLang(translate.getBrowserLang());
  console.log(this.selectLang);
  

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

    this.items = ['My Profile', 'My Orders', 'My Wallet'];

    if(window.localStorage.getItem('selectedLanguage')){
      switch(window.localStorage.getItem('selectedLanguage')){
        
         case this.globalConstant.en:
             this.selectLang = this.globalConstant.enLang;
             break;

        case this.globalConstant.fr:
             this.selectLang = this.globalConstant.frLang;
             break;

        // case this.globalConstant.ja:
        //      this.selectLang = this.globalConstant.jaLang;
        //      break;

        // case this.globalConstant.es:
        //      this.selectLang = this.globalConstant.esLang;
        //      break;

        // case this.globalConstant.de:
        //      this.selectLang = this.globalConstant.deLang;
        //      break;

        // case this.globalConstant.vi:
        //      this.selectLang = this.globalConstant.viLang;
        //      break;
        default:
             this.selectLang = this.globalConstant.enLang;
             break;
      }
    }
    this.changeLanguage(window.localStorage.getItem('selectedLanguage'));
  }


  onChange(langValue: any){
    this.selectLang = langValue;
    console.log(this.selectedLang);
    for(const langVal of this.langService.languages){
      if(langVal.viewValue === langValue){
        localStorage.setItem('selectedLanguage', langVal.value);
        this.changeLanguage(langVal.value);
      }
    }
  }

   changeLanguage(val: any) {
    this.translate.use(val);
    this.translate.setDefaultLang(val);
  }

  close(event: any) {
    this.sidenav.close();
  }

  openComponent(component: any){

    const openComponent = component;
    if(openComponent === 'My Profile'){
      this.router.navigate(['myProfile']);
    }
    else if(openComponent === 'My Orders'){
      this.router.navigate(['myOrder']);
    }
    else if (openComponent === 'My Wallet'){
      this.router.navigate(['payment']);
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
