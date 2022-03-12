import { DialogDataComponent } from './../dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from './../Service/cart.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  public products : any = [];
  public totalSum : number = 0;
  found : any;


  constructor(private dialog: MatDialog, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.getProduct().subscribe(res=>{
    this.products = res;
    this.totalSum = this.cartService.getTotalPrice();
    })
  }

  removeItem(item: any, index: any)
  {
    console.log(item);
    this.cartService.removeCartItem(item, index);
  }

  onMainPage()
  {
   this.router.navigate(['mainPage'])
  }

  onEditDetail()
  {
    this.dialog.open(DialogDataComponent, {
      height: '600px',
      width: '800px',
    });
  }
}
