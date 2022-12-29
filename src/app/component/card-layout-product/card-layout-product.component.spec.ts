import { CardLayoutProductComponent } from './card-layout-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddToCartComponent', () => {
  let component: CardLayoutProductComponent;
  let fixture: ComponentFixture<CardLayoutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
          }
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLayoutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
