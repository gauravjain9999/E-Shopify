import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-layout-product',
  templateUrl: './card-layout-product.component.html',
  styleUrls: ['./card-layout-product.component.css']
})
export class CardLayoutProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToClothPage()
  {
    this.router.navigate(['clothProduct']);
  }

}
