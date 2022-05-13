import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

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
export class DataStorageService {
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
}
