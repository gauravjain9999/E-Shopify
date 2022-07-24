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
    {key: 'Do I need to be a designer or developer to use Shopify?',value: 'I m visible because I4 am open'}];

  content = [

    { icon: 'mood', text: 'Good Mood', 
      value:`Shopify Take care of all Good things that you want. Here you will find multiple varieties of things and 
      makes your mood Happy.Go and Search your favorite product in just one click.`
    },
    { icon: 'people_outline', text: 'A safe and efficient platform',
      value: ` Millions of users trust Shopify to manage their online stores.Trust me You will never go any other website.`
    },
    {
      icon: 'place', text: 'Location Service',
      value: 'Our location is all across the world. You can check here in your service area.'
    }

  ]  



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
