import { UserService } from './../../core/Service/user.service';
import { ApplicationService } from './../../core/Service/applicationService.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

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
  name: any;
  faqList: Array<any>;
  content: Array<any>;

  constructor(private applicationService: ApplicationService, private userService: UserService) {
    this.iconsList = this.userService.getIcons();
    if(localStorage.getItem('loginUser')){
      this.user = JSON.parse(localStorage.getItem(('loginUser')) as string);
      this.fullName = this.user[0].name.split(' ');
    }
    this.faqList = this.userService.getFaQList();
    this.content = this.userService.getContentList();
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
    console.log('Panel closed!');
  }

  afterPanelOpened(event:any){
    console.log('Panel opened!');
  }

}
