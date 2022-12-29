import { MainHeaderComponent } from './main-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('AddToCartComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {
          provide: TranslateModule,
          useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [{
        provide:  MAT_DIALOG_DATA,
        useValue: {},
      },
      {
        provide: MatDialogRef,
        useValue: {}
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
