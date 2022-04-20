import { ApplicationServiceService } from './../Service/application-service.service';
import { ClothService } from './../Service/cloth.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css']
})
export class ClothesDetailComponent implements OnInit, AfterViewChecked{

  listOfItems: any = {};
  myList: any[] = [];
  index = 0;
  apiListData: any[] = [];
  dataItem: any;
  brandItem: any;
  constructor(private clothService: ClothService, private applicationService: ApplicationServiceService) {
  }

  ngOnInit(): void {

    // this.applicationService.submitData.subscribe(data =>{
    //   console.log(data);
    //   this.dataItem = data;
    // });

    this.applicationService.eventData.subscribe(data =>{
      console.log(data);
      this.dataItem = data;
    })


    // this.applicationService.applicationData.subscribe(data =>{
// console.log('dfdf');

      // setTimeout(()=>{
      //   this.listOfItems = data;
      //   console.log(data.brand);
      // },1000);
        // this.listOfItems = _.castArray(data); // Convert Object into Array directly
        // this.myList =  this.listOfItems[this.index];
        // this.listOfItems = Object.values(data)
        // console.log(this.listOfItems[0]);
        // this.brandItem = this.listOfItems[1];

        // console.log(this.myList);
      //  this.updateList(this.listOfItems[0]);
    // });
  }


  ngAfterViewChecked(): void {

    this.applicationService.eventData.subscribe(data =>{
      console.log(data);
      this.dataItem = data;
    })
  }

  updateList(listNumber: any)
  {
    this.apiListData = this.clothService.getListOfCloth();
    for(let i=0; i<this.apiListData.length; i++)
    {
      // console.log(this.apiListData[i].id);
      if(this.apiListData[i].id === listNumber)
      {
        this.brandItem = this.apiListData[i].brand;
        console.log(this.brandItem);
      }
      else{
        this.brandItem = 'dfd'
      }
    }
  }

}
