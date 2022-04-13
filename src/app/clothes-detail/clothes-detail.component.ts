import { ClothService } from './../Service/cloth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css']
})
export class ClothesDetailComponent implements OnInit {

  listOfItems: any;

  constructor(private clothService: ClothService) {}

  ngOnInit(): void {

    this.listOfItems = this.clothService.getListOfCloth();
    console.log(this.listOfItems);
  }


  itemClothList()
  {
    
  }
}
