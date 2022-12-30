import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShootingRangePriceEditComponent } from './admin-shooting-range-price-edit.component';

describe('AdminBulletPriceEditComponent', () => {
  let component: AdminShootingRangePriceEditComponent;
  let fixture: ComponentFixture<AdminShootingRangePriceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShootingRangePriceEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShootingRangePriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
