import { ClothesComponent } from './Clothes/clothes.component';
import { CardLayoutProductComponent } from './card-layout-product/card-layout-product.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MaterialModule } from './material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewLoginComponent } from './new-login/new-login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { ClothesProductComponent } from './clothes-product/clothes-product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { FilterSearchPipe } from './Pipe/filter-search.pipe';
import { DialogDataComponent } from './Dialog-Box/dialog-data/dialog-data.component';
import {NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DialogNotifyComponent } from './Dialog-Box/dialog-notify/dialog-notify.component';
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ConfirmDialogComponent } from './Dialog-Box/confirm-dialog/confirm-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NewLoginComponent,
    PageNotFoundComponent,
    NewRegisterComponent,
    FooterComponent,
    MainPageComponent,
    HeaderComponent,
    CardLayoutProductComponent,
    MainHeaderComponent,
    ClothesComponent,
    ClothesProductComponent,
    AddToCartComponent,
    LoadingSpinnerComponent,
    FilterSearchPipe,
    DialogDataComponent,
    DialogNotifyComponent,
    PaymentCheckoutComponent,
    MyAccountComponent,
    MyProfileComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgImageSliderModule,
    NgxUsefulSwiperModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppModule { }
