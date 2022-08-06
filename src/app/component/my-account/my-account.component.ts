import { Router } from '@angular/router';
import { ApplicationServiceService } from '../../core/Service/application-service.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  name: any;
  url = '';
  constructor(private router:Router,  private applicationService: ApplicationServiceService) { }

  ngOnInit(): void {}


  onSelectFile(event: any) {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
  }



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
