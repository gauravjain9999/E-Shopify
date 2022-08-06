import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLayoutProductComponent } from './card-layout-product.component';

describe('CardLayoutProductComponent', () => {
  let component: CardLayoutProductComponent;
  let fixture: ComponentFixture<CardLayoutProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLayoutProductComponent ]
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
