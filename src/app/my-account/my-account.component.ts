import { Router } from '@angular/router';
import { ApplicationServiceService } from '../core/Pipe/Service/application-service.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  name: any;
  constructor(private router:Router,  private applicationService: ApplicationServiceService) { }

  ngOnInit(): void {}

  onProfileData(){
    this.router.navigate(['myProfile']);
    console.log('router navigation');
  }

  setUserName(item: string){

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.name);
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
