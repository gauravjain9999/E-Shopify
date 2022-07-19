import { ResponseInterceptor } from '../app/core/interceptor/response.interceptor';
import { ClothesComponent } from './Clothes/clothes.component';
import { CardLayoutProductComponent } from './card-layout-product/card-layout-product.component';
import { MainHeaderComponent } from './Headers/main-header/main-header.component';
import { MaterialModule } from './material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewLoginComponent } from './new-login/new-login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './Headers/header/header.component';
import { ClothesProductComponent } from './clothes-product/clothes-product.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { FilterSearchPipe } from './core/Pipe/filter-search.pipe';
import { DialogDataComponent } from './Dialog-Box/dialog-data/dialog-data.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DialogNotifyComponent } from './Dialog-Box/dialog-notify/dialog-notify.component';
import { PaymentCheckoutComponent } from './Dialog-Box/payment-checkout/payment-checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ConfirmDialogComponent } from './Dialog-Box/confirm-dialog/confirm-dialog.component';
import { ClothesDetailComponent } from './clothes-detail/clothes-detail.component'
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'
import { ChartModule} from 'angular-highcharts';
import { MyOrderComponent } from './my-order/my-order.component';
import { HeadersInterceptor } from './core/interceptor/headers.interceptor';
import { environment } from 'src/environments/environment';




export const httpTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http);




export const MY_FORMATS ={

  parse: {dateInput: 'LL'},
  display : {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY'
  }
}

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
    FilterSearchPipe,
    DialogDataComponent,
    DialogNotifyComponent,
    PaymentCheckoutComponent,
    MyAccountComponent,
    MyProfileComponent,
    ConfirmDialogComponent,
    ClothesDetailComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ChartModule,
    NgxPaginationModule,
    NgImageSliderModule,
    NgxUsefulSwiperModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: DateAdapter,
      useClass:MomentDateAdapter,
      deps: [
      MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS
    ]}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppModule { }
