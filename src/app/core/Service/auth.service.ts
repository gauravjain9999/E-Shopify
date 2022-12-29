import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  googleSignIn(idToken: any) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=[API_KEY]}',
      {
        postBody: `id_token=${idToken}&providedId=[google.com]`,
        requestUri: 'http://localhost:4500',
        returnIdpCredential: true,
        returnSecureToken: true,
      }
    );
  }
}
