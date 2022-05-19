import { ApplicationServiceService } from '../core/Service/application-service.service';
import { ConfirmDialogComponent } from './../Dialog-Box/confirm-dialog/confirm-dialog.component';
import { DialogDataComponent } from './../Dialog-Box/dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../core/Service/cart.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  public products : any = [];
  public totalSum : number = 0;
  isChecked : boolean;
  found : any;
  showFlagSpinner: boolean = true;

  constructor(private applicationService: ApplicationServiceService, private dialog: MatDialog, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    setTimeout(() =>{
      this.showFlagSpinner = false;
    },3000);

    this.showFlagSpinner = true;
    this.cartService.getProduct().subscribe(res=>{
    this.products = res;
    this.totalSum = this.cartService.getTotalPrice();
    })
  }

  removeItem(item: any, index: any)
  {
    console.log(item);
    this.cartService.removeCartItem(item, index);
  }

  onMainPage()
  {
   this.router.navigate(['mainPage'])
  }

  onEditDetail()
  {
     this.dialog.open(ConfirmDialogComponent, {
      data :{
        isChecked: 'true',
        isUnChecked: 'false'
      },
      height: '220px',
      width: '480px',
    })

    this.applicationService.checked.subscribe(event =>{
      this.isChecked = event;
      if(this.isChecked)
      {
        // sessionStorage.setItem('CONFIRM', JSON.stringify(confirmDialog));
        this.dialog.open(DialogDataComponent, {
          height: '600px',
          width: '800px',
        });
      }
      else
      {sessionStorage.removeItem('CONFIRM');}
    })

  }
}
