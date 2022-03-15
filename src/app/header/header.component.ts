import { NewRegisterComponent } from './../new-register/new-register.component';
import { NewLoginComponent } from './../new-login/new-login.component';
import { LoginFormComponent } from './../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private dialogBox: MatDialog,  private router: Router) { }

  ngOnInit(): void {
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  loginTo()
  {
   this.dialogBox.open(NewLoginComponent, {

    height: '750px',
    width: '800px'

   })
  //  this.router.navigate(['/new-login']);
  }
  newRegister()
  {
    this.dialogBox.open(NewRegisterComponent, {

      height: '750px',
      width: '800px'

    })
    // this.router.navigate(['new-register']);
  }
  onClick()
  {
    this.router.navigate(['shopifyApp'])
  }
}
