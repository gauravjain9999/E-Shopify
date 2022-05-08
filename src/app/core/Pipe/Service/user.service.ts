import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getClothes()
  {
     var clothes = [
      "Clothes", "Top Clothes", "Branded Clothes"
     ];
     return clothes;
  }

  topBrandClothes()
  {
     var topBrandCloth = [
      "House Of Versace", "Burberry","Ralph Lauren", "Chanel","Prada",
      "Hermes","Gucci","Louis Vuitton", "Blueberry", "Peter England"
     ];
     return topBrandCloth;
  }

  customerRating()
  {
    var rating = [
      "4 star & above", "3 star & above", "2 star & above", "1 star & above"
    ]
    return rating;
  }

}
