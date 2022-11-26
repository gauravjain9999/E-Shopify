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
  showFlagSpinner = true;
  totalLength: any;
  strikeCheckout:any = null;
  user: any;
  fullName: string;
  emailId: string;
  phoneNum: string;
  address: string;

  totalSumWithDiscount: any;
  totalSumWithoutDiscount: any;

  showBtn1 = false;
  showContent1 = false;


  showBtn2 = false;
  showContent2 = false;

  showBtn3 = false;
  showContent3 = false;

  constructor( private router: Router, private cartService: CartService,  public notificationService: NotificationService) {

    if(sessionStorage.getItem('DATA_SOURCE') !== '[]'){

      const cartItem = JSON.parse(sessionStorage.getItem('DATA_SOURCE') as any);
      const checkoutCartItem: any =  this.cartService.getCheckoutCartItem(cartItem);
      this.discountItem = checkoutCartItem[0].totalDiscount;
      this.totalLength =  checkoutCartItem[0].totalLength;
      this.totalSumWithDiscount = checkoutCartItem[0].totalPrice - this.discountItem;
      this.totalSumWithoutDiscount = checkoutCartItem[0].totalPrice;
      this.totalSum = (this.discountItem) ? (checkoutCartItem[0].totalPrice) : (checkoutCartItem[0].totalPrice - this.discountItem);

      // this.cartService.getProduct().subscribe(res=>{
      //   console.log(res);
      //   this.discountItem = res.discount;
      //   this.totalLength = res.length;
      //   this.totalSum = this.cartService.getTotalPrice();
      // });
    }
}

  ngOnInit(): void {

    this.isCheckDetails();
    setTimeout(() =>{
      this.showFlagSpinner = false;
    }, 3000);
    this.showFlagSpinner = true;
    this.stripePaymentGateway();
  }

  isCheckDetails(){

    if(sessionStorage.getItem('ORDER_DETAILS')){
      const user= JSON.parse(sessionStorage.getItem('ORDER_DETAILS') as string);
      this.emailId = user.email;
      this.fullName = user.name;
      this.address = user.address;
      this.phoneNum = user.phoneNumber;
    }
    else{
      const existingUser = JSON.parse(localStorage.getItem('loginUser') as string);
      this.emailId = existingUser[0].email;
      this.fullName = existingUser[0].name;
      this.phoneNum = existingUser[0].phoneNumber;
    }
  }


  toggleHide(event: string){

    if(event == 'login'){
      this.showContent1 = true;
      this.showBtn1 = true;
    }
    else if(event === 'continueCheckout'){
      if(this.fullName === undefined || this.emailId === undefined){
        this.notificationService.showNotification('Please Provide Valid Information to proceed further', 'close');
      }
      else{
        this.showContent2 = true;
        this.showContent1 = false;
        this.showBtn2 = true;
      }
    }

    else if(event === 'Delivery'){
      this.showContent3 = true;
      this.showContent2 = false;
      this.showBtn3 = true;
    }
  }

  navigateToMyOrders(){
    this.router.navigate(['myOrder']);
  }

  redirectMainPage(){
    this.notificationService.showNotification('You Just Redirect To the Main Page', 'Close');
    this.router.navigate(['mainPage']);
   }

  checkout(amount: any) {

    amount = (this.discountItem) ? this.totalSumWithDiscount : amount;
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
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            this.notificationService.showNotification('Payment via stripe successfully Done', 'Close');
          }
        });
      };
      window.document.body.appendChild(scr);
    }
  }
}
