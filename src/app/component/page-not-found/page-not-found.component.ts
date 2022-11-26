import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  status = false;
  textData: string;
  flag = false;
  constructor() {
    // This is intentional
  }

  ngOnInit(): void {

  if (navigator.onLine) {
    this.status = false;
    // Handle offline error
    this.textData = 'Connected with Internet';
  }
  else {
    this.status = false;
    this.textData = 'No Internet Connection';
  }
}


  refreshPage(){

    this.status = true;
    if (navigator.onLine) {
      this.status = true;
      this.textData = 'Connected with Internet';
      this.status = false;
    }
    else {
      const abc = interval(1000).pipe(take(6)).subscribe(value =>{
        if(value < 5){
          console.log(value);
          if(navigator.onLine){
            this.status = false;
            this.textData = 'Connected with Internet';
          }
          else{
            this.textData = `Attempting to retry - #${value}`;
            this.status = true;
          }
        }
        else{
          this.textData = 'No Internet Connection';
        }
      });
      console.log('Not Work');
    }
  }
}
