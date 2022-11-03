import { UrlEndPoint } from './../../constant/urlEndPoint';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Environment } from "src/environments/environment.prod";
import { AuthResponse } from "src/app/ModelDataClass/eShopify.model";
import { LoginUser } from "src/app/ModelDataClass/customer.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  nameEvent = new EventEmitter<any>();
  checked = new EventEmitter<any>();
  applicationData = new EventEmitter<any>();
  authRedirectData = new EventEmitter<boolean>();
  totalDiscount = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) { }

  getNotify(requestData: string){
    return this.http.post(Environment.notify, requestData);
  }

  getClothesData(){
    return this.http.get(Environment.mockUrl + UrlEndPoint.clothes);
  }

  getItemClothesData(id: any){
    return this.http.get(Environment.mockUrl + UrlEndPoint.clothes + `?id=${id}`)
  }

  getCartItemAdded(id: any){
    return this.http.get(Environment.mockUrl + UrlEndPoint.addToCart + `?id=${id}`);
  }

  getCartItemDeleted(id: any){
    return this.http.delete(Environment.mockUrl + UrlEndPoint.clothes + `?id=${id}`)
  }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponse> (
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjAjNRl9AvBm-4e_bSwnVBW-6ZWncCNuI',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    // ).pipe(
    //   catchError(errorRes => {

    //     let errorMessage = 'An unknown error occurred!';
    //     if(!errorRes.error || !errorRes.error.error)
    //     {
    //       return throwError(errorRes)
    //     }
    //     switch(errorRes.error.error.message)
    //     {
    //       case 'EMAIL_EXIST':
    //       errorMessage = "Email Already Exist"
    //     }
    //     return throwError(errorMessage);
    //   }));
  }

  loginIn(email:string, password: string)
  {
    return this.http.post<AuthResponse> (
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjAjNRl9AvBm-4e_bSwnVBW-6ZWncCNuI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
  }

  signUpUser(data: any){
    const url = Environment.mockUrl + UrlEndPoint.signUp;
    return this.http.post(url, data);
  }


  loginUser(data: LoginUser){
    const url = Environment.mockUrl + UrlEndPoint.signUp + `?email=${data.email}&password=${data.password}`;
    return this.http.get(url);
  }

}
