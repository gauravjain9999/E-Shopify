import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartLayoutService {

  constructor(private router: Router) { }


  getIcons()
  {
    var icons = [
      {
        id: 0,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/cee-cees-closet-small-1d6b515579404482342748f0b67ff6e09836a47b648250d8d1b00e2a24b29faa.png'
      },
      {
        id: 1,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/adore-me-small-b4e6488ccabc61cdaaf92d931a5b8a591a35d55982a796a5b582924a9563afb1.png'
      },
      {
        id: 2,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/kirrin-finch-small-b85f000eede1716da6a496a95ff3836b300b5beaa57617ab834332b675ede0d6.png'
      },
      {
        id: 3,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/coco-and-breezy-small-3cc3c1f7d5c50000624adec29ce71dae453821ce3813f0e34b2d3351b5f2b4b2.png'
      },
      {
        id: 4,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/brooklyn-museum-small-3cbca35150e701329098cd95f21ec9388886479a5f781a515466b59d80d7b5bb.png'
      },
      {
        id: 5,
        src: 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/adore-me-small-b4e6488ccabc61cdaaf92d931a5b8a591a35d55982a796a5b582924a9563afb1.png'
      },
      // {
      //   id: 6,
      //   src : 'https://cdn.shopify.com/shopifycloud/brochure/assets/logo-soup/tokyo-bike-small-2295b7e1d183bae07eb36ad83451ec624cfe61bbec39e85877d40600f22115b2.png'
      // }
    ]
    return icons;
  }




  getCartLayoutCards()
  {
    var cardsLayout = [
      {
        id:0,
        src: '../../assets/images/mobilephone.jpeg',
        title: 'Top Mobile Products',
        clickItem: 'Click Here',
      },
      {
        id:1,
        src: '../../assets/images/appliances.jpg',
        title: 'Top Appliances Product',
        clickItem: 'Click Here',
      },
      {
        id:2,
        src: '../../assets/images/clothes.jpg',
        clickItem: 'Click Here',
        // click: this.router.navigate(['clothProduct']),
        title: 'Top Clothes Here',
      },
      {
        id:3,
        src: '../../assets/images/toys.jpg',
        title: 'Top Toys and Gift',
        clickItem: 'Click Here',
      },
      {
        id:4,
        src: '../../assets/images/book4.jpeg',
        title: 'Top Selling Books',
        clickItem: 'Click Here',
      },
    ]
    return cardsLayout;
  }



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
