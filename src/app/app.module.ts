import { HeaderComponent } from './Headers/header/header.component';
import { ResponseInterceptor } from '../app/core/interceptor/response.interceptor';
import { MainHeaderComponent } from './Headers/main-header/main-header.component';
import { MaterialModule } from './material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { FilterSearchPipe } from './core/Pipe/filter-search.pipe';
import { DialogDataComponent } from './Dialog-Box/dialog-data/dialog-data.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DialogNotifyComponent } from './Dialog-Box/dialog-notify/dialog-notify.component';
import { PaymentCheckoutComponent } from './Dialog-Box/payment-checkout/payment-checkout.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { ConfirmDialogComponent } from './Dialog-Box/confirm-dialog/confirm-dialog.component';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'
import { ChartModule} from 'angular-highcharts';
import { HeadersInterceptor } from './core/interceptor/headers.interceptor';
import { NgImageSliderModule } from 'ng-image-slider';
import { AddToCartComponent } from './component/add-to-cart/add-to-cart.component';
import { CardLayoutProductComponent } from './component/card-layout-product/card-layout-product.component';
import { ClothesDetailComponent } from './component/clothes-detail/clothes-detail.component';
import { ClothesProductComponent } from './component/clothes-product/clothes-product.component';
import { LoginFormComponent } from './component/main-Dashboard/main-Dashboard.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { MyOrderComponent } from './component/my-order/my-order.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { NewLoginComponent } from './component/new-login/new-login.component';
import { NewRegisterComponent } from './component/new-register/new-register.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angular-social-login';

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
    SocialLoginModule,
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
    // Ng2SearchPipeModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
          {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '796077373246-i09amroleqkg2qe0t297vee1l6e00g9b.apps.googleusercontent.com'
              )
          }],
          onError: (err) => {
            console.error(err);
          }
        } as SocialAuthServiceConfig,
    },
    {
      provide: DateAdapter,
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
