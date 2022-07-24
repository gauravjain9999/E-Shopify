import { ClothesDetailComponent } from './clothes-detail/clothes-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentCheckoutComponent } from './Dialog-Box/payment-checkout/payment-checkout.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ClothesProductComponent } from './clothes-product/clothes-product.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [

  {path:'', redirectTo: '/shopifyApp', pathMatch: 'full'},
  {path: 'shopifyApp', component: LoginFormComponent},
  {path: 'new-login', component:NewLoginComponent },
  {path: 'footer',    component:FooterComponent},
  {path: 'new-register', component: NewRegisterComponent},
  {path: 'mainPage', component:MainPageComponent},
  {path: 'addToCart', component:AddToCartComponent},
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'myOrder', component: MyOrderComponent},
  {path: 'clothProduct', component:ClothesProductComponent},
  {path: 'payment', component:PaymentCheckoutComponent},
  {path: 'clothesDetails', component: ClothesDetailComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
