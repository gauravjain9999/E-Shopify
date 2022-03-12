import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesProductComponent } from './clothes-product.component';

describe('ClothesProductComponent', () => {
  let component: ClothesProductComponent;
  let fixture: ComponentFixture<ClothesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
