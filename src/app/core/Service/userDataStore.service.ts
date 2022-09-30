import { LoginUser} from './../../ModelDataClass/customer.model';
import { UrlEndPoint } from './../../constant/urlEndPoint';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment.prod';

 interface AuthResponse {

  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean
}

@Injectable({
  providedIn: 'root',
})
export class UserDataStorageService {

  constructor(private http: HttpClient) {}

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
