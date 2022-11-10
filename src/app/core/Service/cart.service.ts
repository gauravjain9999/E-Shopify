import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  //It is act as observable and Subscriber
  public productList = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {}


  getProduct() {
    return this.productList.asObservable();
  }

  getCheckoutCartItem(itemData: any): Array<any>{

    const checkOutCartItem: any[] = [];
    let totalPrice: any = 0;
    let totalDiscount: any = 0;
    let totalLength: any = 0;

    if(itemData === null){
      totalDiscount = 0;
      totalLength = 0;
      totalPrice = 0;
    }
    else{
      itemData.forEach((element:any) => {
      totalPrice += element.price;
      totalDiscount += element.discount;
      totalLength = itemData.length;
     });
    }

    checkOutCartItem.push({'totalPrice': totalPrice, 'totalDiscount': totalDiscount, 'totalLength': totalLength});
    return checkOutCartItem;
  }


  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any, index: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grantTotal = 0;
    this.cartItemList.map((value: any) => {
      grantTotal += value.total;
    });

    return grantTotal;
  }

  favoriteItem(product: any, index: any) {
    console.log(product, index);
  }

  removeCartItem(product: any, index: any) {
    console.log(product, index);
    this.cartItemList.splice(product, 1);
    this.productList.next(this.cartItemList);
  }

  uploadCartItem(product: any, productId: any) {

    this.cartItemList.push(product);
    // if(this.cartItemList.length === 0){
    // }

    // if(this.cartItemList.length > 0){
    //   for(let i=0; i < this.cartItemList.length; i++){
    //     console.log(this.cartItemList[0]);
    //   }
    // }
    console.log(this.cartItemList);
    localStorage.setItem('ITEM_ADDED', JSON.stringify(this.cartItemList));

    this.productList.next(this.cartItemList);
  }

  removeUploadCartItem(product: any) {
    this.cartItemList.splice(product, 1);
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
