import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClothService {


  constructor() { }

  getListOfCloth()
  {
    var clothesList = [
      {
        id: 1,
        brand:   'London Hills',
        title:   'Shirt Black Solid Black',
        price:    300,
        itemAdd:  0,
        description: "Best Fabric and Best cotton Product",
        category: "Men's Clothing",
        path:     '../../assets/ImageCloth/cloth1.jpeg',
        addToCloth: 'Add To Cart',
        rating: 4,
        isCartVisible: false
      },
      {
        id: 2,
        brand: 'BlackBerry',
        itemAdd: 0,
        rating: 2,
        title: 'Shirt Black Solid Black',
        price: 500,
        category: "Men's Clothing",
        description: "Blend Cotton and best product",
        path:  '../../assets/ImageCloth/cloth2.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 3,
        brand:    'Allen Solly',
        title:    'Shirt Black Solid Black',
        price:     600,
        itemAdd:   0,
        quantity:  0,
        rating:    5,
        category: "Men's Clothing",
        description:  "Nice Cotton this will be the best cotton",
        path:  '../../assets/ImageCloth/images (3).jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 4,
        brand: 'Van Heusen',
        title: 'Shirt Black Solid Black',
        price: 200,
        itemAdd: 0,
        rating:  5,
        category: "Men's Clothing",
        description: "Good Cotton Fabric",
        path:  '../../assets/ImageCloth/New-Autumn-Fashion-Brand-Men-Clothes-Slim-Fit-Men-Long-Sleeve-Shirt-Men-Plaid-Cotton-Casual__15044.1569933891.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 5,
        brand: 'Park Avenue',
        title: 'Shirt Black Solid Black',
        price: 100,
        itemAdd: 0,
        rating: 3,
        category: "Men's Clothing",
        description: "Mixture Cotton and Nylon",
        path:  '../../assets/ImageCloth/New-Autumn-Fashion-Brand-Men-Clothes-Slim-Fit-Men-Long-Sleeve-Shirt-Men-Plaid-Cotton-Casual__62864.1549258439.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 6,
        brand: 'Mufti Source',
        title: 'Shirt Black Solid Black',
        price: 800,
        itemAdd: 0,
        rating: 3,
        category: "Men's Clothing",
        description: "Perfect Slim Trim, Good Cotton Fabric",
        path:  '../../assets/ImageCloth/xs-t322-blwh-seven-rocks-original-imafxhagtyj2xvpn.jpeg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 7,
        brand: 'Lee. Source.',
        title: 'Shirt Black Solid Black',
        price: 1000,
        itemAdd: 0,
        rating: 2,
        category: "Men's Clothing",
        description: "Slim Trim Perfect Style Cotton",
        path:  '../../assets/ImageCloth/images (4).jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 8,
        brand: 'Van Huesin',
        title: 'Shirt Black Solid Black',
        price: 900,
        itemAdd: 0,
        rating: 4,
        category: "Men's Clothing",
        description: "Your perfect pack for everyday",
        path:  '../../assets//ImageCloth/download.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 9,
        brand: 'Global Desi',
        title: 'Shirt Black Solid Black',
        price: 1500,
        itemAdd: 0,
        rating: 3,
        category: "Men's Clothing",
        description: "fitting style, contrast long sleeve",
        path:  '../../assets/ImageCloth/shirt3.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 10,
        itemAdd: 0,
        brand: 'Swarovski',
        title: 'Shirt Black Solid Black',
        path:  '../../assets/ImageCloth/images (6).jpg',
        addToCloth: 'Add To Cart',
        category: "Men's Clothing",
        description: "Causal Fitting T-shirt",
        price: 1900,
        rating: 2,
        isCartVisible: false
      },
      {
        id: 11,
        brand: 'Sketchers',
        title: 'Shirt Black Solid Black',
        price: 1600,
        itemAdd: 0,
        rating: 5,
        category: "Men's Clothing",
        description: "Blend Cotton",
        path:  '../../assets/ImageCloth/image20.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 12,
        brand: 'Tom Ford',
        title: 'Shirt Black Solid Black',
        price: 1200,
        itemAdd: 0,
        rating: 5,
        category: "Men's Clothing",
        description: "Fancy Jacket, Pure Cotton",
        path:  '../../assets/ImageCloth/images.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 13,
        brand: 'Park Avenue',
        title: 'Shirt Black Solid Black',
        price: 2000,
        itemAdd: 0,
        rating: 5,
        category: "Men's Clothing",
        description:"Cotton Jacket",
        path: '../../assets/ImageCloth/images (5).jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
      {
        id: 14,
        brand: 'Blackberry',
        title: 'Shirt Black Solid Black',
        price: 1900,
        itemAdd: 0,
        rating: 5,
        category: "Men's Clothing",
        description: "Men's Casual Premium Slim Fit T-shirt",
        path:  '../../assets/ImageCloth/main-qimg-73b1fbf2943ff22b34ba08b2bbf3959e-lq.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false
      },
    ];
    return Object.values(clothesList);
  }
}
