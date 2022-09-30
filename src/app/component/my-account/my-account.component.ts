import { Router } from '@angular/router';
import { ApplicationServiceService } from '../../core/Service/application-service.service';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnChanges{

  @Input() userName: any;
  accountHolderName: any;
  accountHolder: any;
  name:any;
  url = '';
  constructor(private router:Router,  private applicationService: ApplicationServiceService) { }

  ngOnInit(): void {

    if(localStorage.getItem('loginUser')){
      this.accountHolder = JSON.parse(localStorage.getItem('loginUser') as string);
      this.name = this.accountHolder[0].name.split(' ');
      this.accountHolderName = this.name[0];
    }
  }


  onSelectFile(event: any) {
  }

  onProfileData(){
    this.router.navigate(['myProfile']);
    console.log('router navigation');
  }

  setUserName(item: string){

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  myOrder(){
    this.router.navigate(['myOrder']);
  }

  myPayment()
  {
    this.router.navigate(['payment']);
  }


  getUserName(item: any){
    console.log(item);
  }


}
