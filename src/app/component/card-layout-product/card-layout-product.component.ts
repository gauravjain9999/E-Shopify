import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartLayoutService } from 'src/app/core/Service/cart-layout.service';

@Component({
  selector: 'app-card-layout-product',
  templateUrl: './card-layout-product.component.html',
  styleUrls: ['./card-layout-product.component.css']
})
export class CardLayoutProductComponent implements OnInit {


  listOfCardsItem :any;
  constructor(private spinner: NgxSpinnerService,  private cartService: CartLayoutService,  private router: Router) { }

  ngOnInit(): void {
    this.listOfCardsItem = this.cartService.getCartLayoutCards()
    console.log(this.listOfCardsItem);
  }


  goToClothPage(item: number,  index :number)
  {
    if(index === 2){
      sessionStorage.setItem('TEMP_ITEM_CLOTH', JSON.stringify(item));
      // console.log(sessionStorage.getItem(JSON.parse('TEMP_ITEM_CLOTH')));
      this.router.navigate(['clothProduct']);
    }
    else{
      sessionStorage.removeItem('TEMP_ITEM_CLOTH');
    }
  }

}
