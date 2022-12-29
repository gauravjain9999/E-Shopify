import { HeaderComponent } from './header.component';
import { NotificationService } from 'src/app/core/Service/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('AddToCartComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
