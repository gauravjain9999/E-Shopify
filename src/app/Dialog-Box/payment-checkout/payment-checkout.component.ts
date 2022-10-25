import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
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
  user: any;
  fullName: string;
  emailId: string;
  phoneNum: string;
  address: string;

  showBtn1: boolean = false;
  showContent1: boolean = false;


  showBtn2: boolean = false;
  showContent2: boolean = false;

  showBtn3: boolean = false;
  showContent3: boolean = false;

  constructor( private router: Router, private cartService: CartService,  public notificationService: NotificationService) {

    this.cartService.getProduct().subscribe(res=>{
    this.discountItem = res.discount;
    this.totalLength = res.length;
    this.totalSum = this.cartService.getTotalPrice();
  });
}

  ngOnInit(): void {
    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000)
    this.showFlagSpinner = true;
    this.userDetails();
    this.stripePaymentGateway();
  }

  userDetails(){

    if(sessionStorage.getItem('ORDER_DETAILS')){
      let user= JSON.parse(sessionStorage.getItem('ORDER_DETAILS') as string);
      this.emailId = user.email;
      this.fullName = user.name;
      this.address = user.address;
      this.phoneNum = user.phoneNumber;
    }
  }


  toggleHide(event: string){

    if(event == 'login'){
      this.showContent1 = true;
      this.showBtn1 = true;
    }
    else if(event === 'continueCheckout'){
      this.showContent2 = true;
      this.showContent1 = false;
      this.showBtn2 = true;
    }

    else if(event === 'Delivery'){
      this.showContent3 = true;
      this.showContent2 = false;
      this.showBtn3 = true;
    }
  }

  navigateToMyOrders(){
    this.router.navigate(['myOrder'])
  }

  redirectMainPage(){
    this.notificationService.showNotification('You Just Redirect To the Main Page', 'Close');
    this.router.navigate(['mainPage']);
   }

  checkout(amount: any) {

    if(amount > 0){
      const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        this.navigateToMyOrders();
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
