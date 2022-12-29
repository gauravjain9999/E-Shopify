import { MediaObserver, MediaChange } from '@angular/flex-layout';
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
  globalConstant = GlobalConstant;

  fullName: any;
  searchText: any;
  loginUserName:any;
  opened = false;
  name:any;
  email: string;
  dataSource: any[]= [];
  totalItem = 0;
  items: unknown[] = [];
  firstName: any;
  selectedOption: any;
  badgeCount = 0;
  mediaFlagObserver = false;
  count = 0;

  constructor(
  public translate: TranslateService, private router: Router, public langService: LanguageService,
  private dialog: MatDialog, private notificationService: NotificationService, public mediaObserver: MediaObserver) {

  translate.addLangs(this.langService.supportLanguages);
  if(window.localStorage.getItem('selectedLanguage')){
    this.getDefaultLang();
  }
  else{
    this.selectedOption =  this.langService.languages.filter(item => item.value === 'en')[0].viewValue;
    translate.setDefaultLang(translate.getBrowserLang());
  }
  this.isCartItemPresent();
  //  this.cartService.getProduct().subscribe(res =>{
  //  this.dataSource = res;
  //  this.totalItem = res.length;
  // })
}

getSelectedDefaultOption(selectedOption: any){

  if(selectedOption === 'ENGLISH' || selectedOption === 'FRANÇAIS' || selectedOption === 'TIẾNG VIỆT'
  || selectedOption === '日本語'){
    return true;
  }
  return false;
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
  else {
    this.notificationService.showNotification('Redirected To the Dashboard', 'Close');
    this.router.navigate(['mainPage']);
   }
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes['userName']){
      this.fullName = changes['userName'].currentValue;
      this.firstName = this.fullName[0];
      this.name = this.fullName.shift().charAt(0) +  this.fullName.shift().charAt(0);
      this.loginUserName = this.firstName;
    }

    if(changes['notifyUpdate']){
      this.totalItem = changes['notifyUpdate'].currentValue;
      this.updateNotifyCount.emit(this.totalItem);
      console.log(this.totalItem);
    }
  }

  ngOnInit(): void {
    
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      this.mediaFlagObserver =(media[1].mqAlias === 'lt-md')? true:false;
    })

    this.items = ['My Profile', 'My Orders', 'My Wallet'];
    this.getDefaultLang();
  }

  getDefaultLang(){
    if(window.localStorage.getItem('selectedLanguage')){
      switch(window.localStorage.getItem('selectedLanguage')){

        case this.globalConstant.en:
            this.selectedOption = this.globalConstant.enLang;
            break;

        case this.globalConstant.ja:
            this.selectedOption = this.globalConstant.jaLang;
            break;

        case this.globalConstant.fr:
            console.log(this.selectedOption);
            this.selectedOption = this.globalConstant.frLang;
            break;

        case this.globalConstant.vi:
            this.selectedOption = this.globalConstant.viLang;
            break;

        default:
            this.selectedOption = this.globalConstant.enLang;
            break;
        }
      this.changeLanguage(window.localStorage.getItem('selectedLanguage'));
    }
  }

  changeLanguage(val: any) {
    this.translate.use(val);
    this.translate.setDefaultLang(val);
    localStorage.setItem('selectedLanguage', val);
  }

  close(event: any) {
    this.sidenav.close();
  }

  openComponent(component: any){

    const openComponent = component;
    if(openComponent === 'Profile'){
      this.router.navigate(['myProfile']);
    }
    else if(openComponent === 'Orders'){
      this.router.navigate(['myOrder']);
    }
    else if (openComponent === 'Wallet'){
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
