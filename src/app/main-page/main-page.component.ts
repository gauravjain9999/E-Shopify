import { ApplicationServiceService } from '../core/Service/application-service.service';
import { Component, OnInit } from '@angular/core';
import { CartLayoutService } from '../core/Service/cart-layout.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  panelOpenState = false;
  iconsList : any[] = [];
  name : any;
  faqList = [
    {key: 'What is Shopify and how does it work?',                  value: 'I m visible because I4 am open'},
    {key: 'How much does Shopify cost?',                            value: 'I m visible because I4 am open'},
    {key: 'Can I use my own domain name with Shopify?',             value: 'I m visible because I4 am open'},
    {key: 'Do I need to be a designer or developer to use Shopify?',value: 'I m visible because I4 am open'}
];
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
