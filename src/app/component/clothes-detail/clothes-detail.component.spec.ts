import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesDetailComponent } from './clothes-detail.component';

describe('ClothesDetailComponent', () => {
  let component: ClothesDetailComponent;
  let fixture: ComponentFixture<ClothesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
