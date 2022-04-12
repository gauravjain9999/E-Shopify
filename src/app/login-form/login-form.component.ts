import { CartLayoutService } from './../Service/cart-layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { indexOf } from 'lodash';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  showSliderCart : any;
  index : number;

  constructor(private activate: ActivatedRoute, private router: Router,
    private cartLayoutService: CartLayoutService) { }

  ngOnInit(): void {

    this.showSliderCart = this.cartLayoutService.getCartLayoutDesgin();
    this.index = this.showSliderCart.findIndex((x: any ) =>
    x.title === 'Top Clothes Here ! Shop Now');
    console.log(this.index);
    // this.items(this.index)
  }

  onClothes()
  {
    // alert('Login First')
    this.router.navigate(['clothProduct'])
  }


  // items(indx: number)
  // {
  //   if(this.index === indx)
  //   {
  //   this.router.navigate(['clothProduct']);
  //   }
  // }


//   imageObject = [
//    {
//     src: '../../assets/images/mobilephone.jpeg',
//     thumbImage: '../../assets/images/mobilephone.jpeg',
//     title: 'Top Mobiles Here ! Shop Now '
//    },
//    {
//     src: '../../assets/images/book4.jpeg',
//     thumbImage: '../../assets/images/book4.jpeg',
//     title: 'Top Books Here ! Shop Now'
//    },
//    {
//     src: '../../assets/images/clothes.jpg',
//     thumbImage: '../../assets/images/clothes.jpg',
//     title: 'Top Brands Cloth Here ! Shop Now'
//    },
//    {
//     image: '../../assets/images/appliances.jpg',
//     thumbImage: '../../assets/images/appliances.jpg',
//     title: 'Top Appliances Here ! Shop Now'
//    },
//    {
//     image: "../../assets/images/toys.jpg",
//     thumbImage: '../../assets/images/toys.jpg',
//     title: 'Top toys Here ! Shop Now'
//    },
//  ];
}


