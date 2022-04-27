import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationServiceService } from '../Service/application-service.service';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  public products : any = [];
  public totalSum : number = 0;

  constructor(private applicationService: ApplicationServiceService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.getProduct().subscribe(res=>{
      this.products = res;
      this.totalSum = this.cartService.getTotalPrice();
    })
  }

}
