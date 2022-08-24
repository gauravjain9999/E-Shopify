
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewLoginComponent } from 'src/app/component/new-login/new-login.component';
import { NewRegisterComponent } from 'src/app/component/new-register/new-register.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  supportLanguages = ['en'];
  constructor( public translate: TranslateService, private dialogBox: MatDialog,  private router: Router) { }

  ngOnInit(): void {

    this.translate.addLangs(this.supportLanguages);
    this.translate.setDefaultLang('en');
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  loginTo()
  {
   this.dialogBox.open(NewLoginComponent, {

    height: '650px',
    width: '800px'

   })
  //  this.router.navigate(['/new-login']);
  }
  newRegister(){
    this.dialogBox.open(NewRegisterComponent, {
      height: '650px',
      width: '800px'
  })
  // this.router.navigate(['new-register']);
}
  onClick(){
    this.router.navigate(['shopifyApp'])
  }
}
