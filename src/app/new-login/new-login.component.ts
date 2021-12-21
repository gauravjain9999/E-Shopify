import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onLogin()
  {
    this.router.navigate(['mainPage']);
  }

  onSubmit()
  {
    this.router.navigate(['new-register'])
  }
}
