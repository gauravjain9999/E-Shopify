import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  nameEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) { }

  notifyUrl = "https://formspree.io/f/mqknlppk";

  getNotify(requestData: string)
  {
    return this.httpClient.post(this.notifyUrl, requestData);
  }
}
