import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartLayoutService {

  constructor(
    private router: Router
  ) { }


  getCartLayoutDesgin()
  {
    var cartLayout =[
      {
        id: 0,
        title: 'Top Mobile Products ! Shop Now ',
        src: '../../assets/images/mobilephone.jpeg',
        clickItem: 'Click Here ->',
        thumbImage: '../../assets/images/mobilephone.jpeg'
      },
      {
        id: 1,
        title: 'Top Selling Books ! Shop Now',
        src: '../../assets/images/book4.jpeg',
        clickItem: 'Click Here ->',
        thumbImage: '../../assets/images/book4.jpeg'
      },
      {
        id: 2,
        title: 'Top Appliances Here ! Shop Now',
        src: '../../assets/images/appliances.jpg',
        clickItem: 'Click Here ->',
        thumbImage: '../../assets/images/appliances.jpg',
      },
      {
        id: 3,
        title: 'Top Toys Here ! Shop Now',
        src: '../../assets/images/toys.jpg',
        clickItem: 'Click Here ->',
        thumbImage: '../../assets/images/toys.jpg',
      },
      {
        id: 4,
        title: 'Top Clothes Here ! Shop Now',
        src: '../../assets/images/clothes.jpg',
        clickItem: 'Click Here ->',
        // click: this.router.navigate(['clothProduct']),
        thumbImage: '../../assets/images/clothes.jpg',
      },

    ];
    return cartLayout
  }

}
