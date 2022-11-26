import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnChanges{

  @Input() userName: any;
  @Input() firstName: any;
  accountHolderName: any;
  accountHolder: any;
  name:any;
  url = '../../assets/Icons/user.png';

   component = [
    {key: 'My Profile', value: 'This is an Example of Mat Expansion Panel', icon: 'person'},
    {key: 'My Orders',  value: 'This is an Example of Mat Expansion Panel', icon: 'airport_shuttle'},
    {key: 'My Wallet',  value: 'This is an Example of Mat Expansion Panel', icon: 'account_balance_wallet'},
   ];

  constructor(private router:Router) { }

  ngOnInit(): void {

    // if(localStorage.getItem('loginUser')){
    //   this.accountHolder = JSON.parse(localStorage.getItem('loginUser') as string);
    //   this.name = this.accountHolder[0].name.split(' ');
    //   this.accountHolderName = this.name[0];
    // }

    if(localStorage.getItem('myImage')){
      this.url = JSON.parse(window.localStorage.getItem('myImage') as string);
    }
  }


  onSelectFile(event: any) {

    if(event.target.files){
     const reader = new FileReader();
     reader.readAsDataURL(event.target.files[0]);
     reader.onload = (e:any) =>{
      this.url = e.target.result;
      if(this.url){
        window.localStorage.setItem('myImage', JSON.stringify(this.url));
      }
     };
    }
  }

  navigateComponent(index: number){

    if(index === 0){
      this.router.navigate(['myProfile']);
    }
    else if(index === 1){
      this.router.navigate(['myOrder']);
    }
    else if(index === 2){
      this.router.navigate(['payment']);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['firstName']){
      this.name = changes['firstName'].currentValue;
    }
  }

  getUserName(item: any){
    console.log(item);
  }

}
