import { Router } from '@angular/router';
import { ApplicationServiceService } from './../Service/application-service.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  name: any;
  constructor(private router:Router,  private applicationService: ApplicationServiceService) { }

  ngOnInit(): void {

    this.applicationService.nameEvent.subscribe(event =>{
      console.log(event);
      this.setUserName(event)
    })
  }

  onProfileData()
  {
    this.router.navigate(['myProfile']);
    console.log('router navigation');
  }

  setUserName(item: string)
  {
    this.name = item
    this.applicationService.nameEvent.subscribe(form=>{
      console.log(form);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
    console.log(this.name);

  }

  getUserName(item: any)
  {
    console.log(item);

  }


}
