import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  nameEvent = new EventEmitter<any>();
  constructor() { }
}
