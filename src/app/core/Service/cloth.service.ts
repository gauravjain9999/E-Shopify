import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClothService {

  fileReader =  new FileReader();

  constructor() {
    // This is intentional
  }


  // Convert Image to Base64 from File
  // getImageBase64(fileData: any){

  // const observable = new Observable((subscriber: Subscriber<any>) =>{

  //   this.readFile(fileData, subscriber);

  //   observable.subscribe((d) =>{
  //     console.log(d);
  //   })
  // });
  // }

  // readFile(file: any,  subscriber: Subscriber<any>){

  //   const fileReader = new FileReader();
  //    fileReader.readAsDataURL(file);

  //    fileReader.onload = () =>{
  //     subscriber.next(fileReader.result);
  //     subscriber.complete();
  //   };

  //    fileReader.onerror = (error) =>{
  //     subscriber.error(error);
  //     subscriber.complete();
  //   }
  // }


  getListOfCloth()
  {
    const clothesList = [
      {
        id: 1,
        brand:   'London Hills',
        title:   'Shirt Black Solid Black',
        price:    1300,
        itemAdd:  0,
        discount: '100',
        seller: 'Atyantah',
        color: 'Black and White',
        description: 'Best Fabric and Best cotton Product',
        category: 'Men\'s Clothing',
        path:     '../../../assets/ImageCloth/shirt1.jpg',
        addToCloth: 'Add To Cart',
        rating: 4,
        favorite: false,
        isCartVisible: false,
        Founded:	'1993 in Chandni Chowk, India',
        Founders:	'Gaurav and Nikhil Mohan',
        numberOfLocations:	'380 cities',
        areaServed:	'India',
        review: 45
      },
      {
        id: 2,
        brand: 'BlackBerry',
        itemAdd: 0,
        rating: 2,
        discount: '300',
        title: 'Shirt Black Solid Black',
        price: 2500,
        seller: 'ALI GARMENTS',
        color: 'Black and NavyBlue',
        category: 'Men\'s Clothing',
        description: 'Blend Cotton and best product',
        path:  '../../../assets/ImageCloth/shirt2.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1991 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 43
      },
      {
        id: 3,
        brand:    'Allen Solly',
        title:    'Shirt Black Solid Black',
        price:     3600,
        itemAdd:   0,
        discount: '300',
        quantity:  0,
        rating:    5,
        seller: 'Gkcreative',
        color: 'Black, OffWhite, Grey',
        category: 'Men\'s Clothing',
        description:  'Nice Cotton this will be the best cotton',
        path:  '../../../assets/ImageCloth/shirt3.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1998 in Chandni Chowk, India',
        Founders:	'Mohan and Nikhil Mohan',
        numberOfLocations:	'390 cities',
        areaServed:	'India',
        review: 50
      },
      {
        id: 4,
        brand: 'Van Heusen',
        title: 'Shirt Black Solid Black',
        price: 1200,
        itemAdd: 0,
        rating:  5,
        discount: '400',
        seller: 'Chill Winston',
        color: 'navyBlue',
        category: 'Men\'s Clothing',
        description: 'Good Cotton Fabric',
        path:  '../../../assets/ImageCloth/shirt4.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1990 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'310 cities',
        areaServed:	'India',
        review: 60
      },
      {
        id: 5,
        brand: 'Park Avenue',
        title: 'Shirt Black Solid Black',
        price: 1100,
        itemAdd: 0,
        rating: 3,
        discount: '100',
        seller: 'HYPERNATION',
        color: 'Black and White',
        category: 'Men\'s Clothing',
        description: 'Mixture Cotton and Nylon',
        path: '../../../assets/ImageCloth/shirt5.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'2001 in Chandni Chowk, India',
        Founders:	'Brijesh and Kirti Mohan',
        numberOfLocations:	'500 cities',
        areaServed:	'India',
        review: 43
      },
      {
        id: 6,
        brand: 'Mufti Source',
        title: 'Shirt Black Solid Black',
        price: 1800,
        itemAdd: 0,
        rating: 3,
        discount: '300',
        seller: 'shoppers point',
        color: 'Black and White',
        category: 'Men\'s Clothing',
        description: 'Perfect Slim Trim, Good Cotton Fabric',
        path:  '../../../assets/ImageCloth/shirt6.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1992 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 44
      },
      {
        id: 7,
        brand: 'Lee. Source.',
        title: 'Shirt Black Solid Black',
        price: 3000,
        itemAdd: 0,
        rating: 2,
        discount: '240',
        color: 'Blue',
        seller: 'ELLAZY',
        category: 'Men\'s Clothing',
        description: 'Slim Trim Perfect Style Cotton',
        path:  '../../../assets/ImageCloth/shirt7.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1931 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 46
      },
      {
        id: 8,
        brand: 'Van Huesin',
        title: 'Shirt Black Solid Black',
        price: 1900,
        itemAdd: 0,
        rating: 4,
        discount: '300',
        color: 'offBlue',
        seller: 'Aseenaa',
        category: 'Men\'s Clothing',
        description: 'Your perfect pack for everyday',
        path:  '../../../assets/ImageCloth/shirt8.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1990 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 55
      },
      {
        id: 9,
        brand: 'Global Desi',
        title: 'Shirt Black Solid Black',
        price: 1500,
        itemAdd: 0,
        rating: 3,
        discount: '140',
        seller: 'AMAN FASHION',
        color: 'Black',
        category: 'Men\'s Clothing',
        description: 'fitting style, contrast long sleeve',
        path: '../../../assets/ImageCloth/shirt9.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1993 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 41
      },
      {
        id: 10,
        itemAdd: 0,
        brand: 'Swarovski',
        title: 'Shirt Black Solid Black',
        path:  '../../../assets/ImageCloth/shirt10.jpg',
        addToCloth: 'Add To Cart',
        category: 'Men\'s Clothing',
        description: 'Causal Fitting T-shirt',
        price: 1900,
        discount: '200',
        seller: 'Royalty Retail And Export',
        rating: 2,
        color: 'White and Blue',
        isCartVisible: false,
        Founded:	'1991 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 42
      },
      {
        id: 11,
        brand: 'Sketchers',
        title: 'Shirt Black Solid Black',
        price: 1600,
        itemAdd: 0,
        color: 'Grey',
        rating: 5,
        discount: '300',
        seller: 'Kla Irs',
        category: 'Men\'s Clothing',
        description: 'Blend Cotton',
        path:  '../../../assets/ImageCloth/shirt11.jpeg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1992 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 44
      },
      {
        id: 12,
        brand: 'Tom Ford',
        title: 'Shirt Black Solid Black',
        price: 1200,
        itemAdd: 0,
        rating: 5,
        discount: '200',
        color: 'navyBlue',
        seller: 'VASANTIKA',
        category: 'Men\'s Clothing',
        description: 'Fancy Jacket, Pure Cotton',
        path:  '../../../assets/ImageCloth/shirt12.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1991 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 50
      },
      {
        id: 13,
        brand: 'Park Avenue',
        title: 'Shirt Black Solid Black',
        price: 2000,
        itemAdd: 0,
        color: 'White',
        rating: 5,
        discount: '200',
        seller: 'Gaurav Fashion',
        category: 'Men\'s Clothing',
        description:'Cotton Jacket',
        path:'../../../assets/ImageCloth/shirt13.jpeg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1991 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 60
      },
      {
        id: 14,
        brand: 'Blackberry',
        title: 'Shirt Black Solid Black',
        price: 1900,
        itemAdd: 0,
        rating: 5,
        discount: '200',
        color: 'White',
        seller: 'Megumi',
        category: 'Men\'s Clothing',
        description: 'Men\'s Casual Premium Slim Fit T-shirt',
        path: '../../../assets/ImageCloth/shirt14.jpg',
        addToCloth: 'Add To Cart',
        isCartVisible: false,
        Founded:	'1991 in Chandni Chowk, India',
        Founders:	'Nitin Mohan and Nikhil Mohan',
        numberOfLocations:	'350 cities',
        areaServed:	'India',
        review: 42
      },
    ];
    return Object.values(clothesList);
  }
}
