import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/Service/cart.service';

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.css']
})
export class PaymentCheckoutComponent implements OnInit {

  totalSum: any;
  discountItem: any;
  totalLength: any;
  strikeCheckout:any = null;

  constructor(private cartService: CartService) {

    this.cartService.getProduct().subscribe(res=>{
      console.log(res.discount);
    this.discountItem = res.discount;
    console.log(this.discountItem);
    this.totalLength = res.length;
    this.totalSum = this.cartService.getTotalPrice();
  });
}

  ngOnInit(): void {
    this.stripePaymentGateway();
  }


  checkout(amount: any) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe sucessfull !');
          }
        });
      }
      window.document.body.appendChild(scr);
    }
  }
}
