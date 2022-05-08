import { ApplicationServiceService } from '../core/Pipe/Service/application-service.service';
import { Component, OnInit } from '@angular/core';
import { CartLayoutService } from '../core/Pipe/Service/cart-layout.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  panelOpenState = false;
  iconsList : any[] = [];
  name : any;
  constructor(private cardLayout: CartLayoutService, private applicationService: ApplicationServiceService) { }

  ngOnInit(): void {

    this.applicationService.nameEvent.subscribe(event =>{
      this.name = event;
    })
    this.iconsList = this.cardLayout.getIcons();
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
console.log(this.name);

  }

}
