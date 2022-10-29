import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartLayoutService } from 'src/app/core/Service/cart-layout.service';
import { NotificationService } from 'src/app/core/Service/notification.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-Dashboard.component.html',
  styleUrls: ['./main-Dashboard.component.css'],
})
export class LoginFormComponent implements OnInit {
  showSliderCart: any;
  index: number;
  itemsGroup = [
    {
      src: "../../../assets/Icons/deal.png",
      altAttr: "Hot deals",
      Tooltip: "Hot Deals",
    },
    {
      src: "../../../assets/Icons/home-appliance.png",
      altAttr: "Home Appliances",
      Tooltip: "Home Appliances",
    },
    {
      src: "../../../assets/Icons/fashion.png",
      altAttr: "Fashion",
      Tooltip: "Fashion & Styles",
    },
    {
      src: "../../../assets/Icons/responsive.png",
      altAttr: "Mobiles and Tablets",
      Tooltip: "Mobiles and Gadgets",
    },
    {
      src: '../../../assets/Icons/toys.png',
      altAttr: 'Toys and Games',
      Tooltip: 'Toys and Games',
    },
  ];

  constructor(
    private notificationService: NotificationService,
    private cartLayoutService: CartLayoutService
  ) {}

  ngOnInit(): void {
    this.showSliderCart = this.cartLayoutService.getCartLayoutDesgin();
    this.index = this.showSliderCart.findIndex(
      (x: any) => x.title === 'Top Clothes Here ! Shop Now'
    );
    // this.items(this.index)
  }

  onClothes() {
    this.notificationService.showNotification('Please Login First', 'close');
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
