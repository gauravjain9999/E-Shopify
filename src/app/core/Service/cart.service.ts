import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any =[];
  //It is act as observable and Subscriber
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProduct()
  {
    return this.productList.asObservable();
  }

  setProduct(product: any)
  {
   this.cartItemList.push(...product);
   this.productList.next(product);
  }

  addToCart(product: any, index:any){

    this.cartItemList.push(product);
    sessionStorage.setItem('Item Added', JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice():number
  {
    let grantTotal = 0;
    this.cartItemList.map((value:any)=>{
      grantTotal += value.total;
    });

    return grantTotal;
  }

  removeCartItem(product: any, index:any)
  {
    console.log(product, index);
    this.cartItemList.splice(product, 1);
    this.productList.next(this.cartItemList);
  }

  uploadCartItem(product: any)
  {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
  }

  removeUploadCartItem(product: any)
  {
    this.cartItemList.splice(product, 1);
    this.productList.next(this.cartItemList);
  }

  removeAllCart()
  {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
