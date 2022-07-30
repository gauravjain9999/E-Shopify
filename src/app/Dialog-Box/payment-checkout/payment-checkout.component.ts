import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/Service/cart.service';
import { NotificationService } from 'src/app/core/Service/notification.service';

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.css']
})
export class PaymentCheckoutComponent implements OnInit {

  totalSum: any;
  discountItem: any;
  showFlagSpinner: boolean = true;
  totalLength: any;
  strikeCheckout:any = null;

  constructor( private router: Router, private cartService: CartService,  public notificationService: NotificationService) {

    this.cartService.getProduct().subscribe(res=>{
    console.log(res.discount);
    this.discountItem = res.discount;
    console.log(this.discountItem);
    this.totalLength = res.length;
    this.totalSum = this.cartService.getTotalPrice();
  });
}

  ngOnInit(): void {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)
    this.showFlagSpinner = true;
    this.stripePaymentGateway();
  }

  navigateToMyOrders(){
    this.router.navigate(['myOrder']) 
  }



  checkout(amount: any) {
    
    if(amount > 0){
      const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        this.notificationService.showNotification('Successfully Placed  ! Go To My Orders', 'Close');
      }
  });
  
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }
  else{
    this.notificationService.showNotification('Please Select One Item At Least in Cart.', 'Close');
  }
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
            this.notificationService.showNotification('Payment via stripe successfully Done', 'Close');
          }
        });
      }
      window.document.body.appendChild(scr);
    }
  }
}
