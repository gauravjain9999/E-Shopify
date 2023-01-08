import { LoginFormComponent } from './../../component/main-Dashboard/main-Dashboard.component';
import { ApplicationService } from './../../core/Service/applicationService.service';
import { GlobalConstant } from './../../core/constant/globalConstant';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NewLoginComponent } from 'src/app/component/new-login/new-login.component';
import { NewRegisterComponent } from 'src/app/component/new-register/new-register.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/Service/lang.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ViewChild('loginFormData') loginData: TemplateRef<LoginFormComponent>;
  selectedOption: any;
  supportLanguages = ['en'];
  mediaFlagObserver = false;
  globalConstant = GlobalConstant;

  constructor( public translate: TranslateService, public langService: LanguageService,
  public dialogBox: MatDialog,  private router: Router,  public applicationService: ApplicationService,
  public mediaObserver: MediaObserver) {

  translate.addLangs(this.langService.supportLanguages);
  if(window.localStorage.getItem('selectedLanguage')){
    this.getDefaultLang();
  }
  else{
    this.selectedOption =  this.langService.languages.filter(item => item.value === 'en')[0].viewValue;
    translate.setDefaultLang('en');
  }
 }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      console.log(media);
      this.mediaFlagObserver = (media[1].mqAlias === 'lt-md' || media[1].mqAlias === 'lt-sm') ? true : false;
      console.log(this.mediaFlagObserver);
    })
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  loginTo(){
    const dialogRef = this.dialogBox.open(NewLoginComponent, {
      data:{
       modal: true
      },
      height: '650px',
      width: '800px',
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result === undefined){
        this.router.navigateByUrl('/shopifyApp');
      }
    });
  }

  newRegister(){
    const dialogRef = this.dialogBox.open(NewRegisterComponent, {
      data:{
        modal: true
      },
      height: '650px',
      width: '800px'
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result){
        this.router.navigateByUrl('/new-login');
      }
      else if(result === undefined){
        this.router.navigateByUrl('/shopifyApp');
      }
    });
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
  onClick(){
    this.router.navigate(['shopifyApp'])
  }

  changeLanguage(val: any) {
    this.translate.use(val);
    this.translate.setDefaultLang(val);
    localStorage.setItem('selectedLanguage', val);
  }

  getSelectedDefaultOption(selectedOption: any){
    if(selectedOption === 'ENGLISH' || selectedOption === 'FRANÇAIS' || selectedOption === 'TIẾNG VIỆT'
    || selectedOption === '日本語'){
      return true;
    }
     return false;
  }
}
