
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { ApplicationServiceService } from 'src/app/core/Service/application-service.service';
import { CartLayoutService } from 'src/app/core/Service/cart-layout.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('accordion', {static: true}) Accordion!: MatAccordion;
  @ViewChild('mapanel', {static: false}) mPanel!: MatExpansionPanel;

  panelOpenState = false;
  user: any[] = [];
  userName: string;
  fullName:any;
  iconsList : any[] = [];
  name : any;

  faqList = [
    {key: 'What is Shopify and how does it work?',                  value: 'This is an Example of Mat Expansion Panel'},
    {key: 'How much does Shopify cost?',                            value: 'This is an Example of Mat Expansion Panel'},
    {key: 'Can I use my own domain name with Shopify?',             value: 'This is an Example of Mat Expansion Panel'},
    {key: 'Do I need to be a designer or developer to use Shopify?',value: 'This is an Example of Mat Expansion Panel'}];

  content = [

    { icon: 'mood', text: 'Good Mood',
      value:`Shopify Take care of all Good things that you want. Here you will find multiple varieties of things and
      makes your mood Happy.Go and Search your favorite product in just one click.`
    },
    { icon: 'people_outline', text: 'A safe platform',
      value: ` Millions of users trust Shopify to manage their online stores.Trust me you will never go any other website.
      We give best qualities of product of our customers`
    },
    {
      icon: 'place', text: 'Location Service',
      value: `Our location is all across the world. More than 70+ service center across the world.
      You can check here in your service area. We have the best service in the world`
    }

  ]

  constructor(private cardLayout: CartLayoutService, private applicationService: ApplicationServiceService) {
    this.iconsList = this.cardLayout.getIcons();
    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }
  }

  ngOnInit(): void {
    this.closeAllPanels();
    this.applicationService.nameEvent.subscribe(event =>{
      this.name = event;
    });
  }

  closeAllPanels(){
    this.Accordion.closeAll();
  }

  closeAccordion(){
    //This is called when we close expansion panel on the basis of viewChild or reference of Mat Expansion Panel
    this.mPanel.accordion.closeAll();
  }

  afterPanelClosed(event:any){
    console.log(this.mPanel);
    console.log("Panel closed!");
  }

  afterPanelOpened(event:any){
    console.log("Panel opened!");
  }

}
