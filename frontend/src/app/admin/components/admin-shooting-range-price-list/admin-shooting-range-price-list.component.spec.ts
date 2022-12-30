import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShootingRangePriceListComponent } from './admin-shooting-range-price-list.component';

describe('AdminBulletPriceListComponent', () => {
  let component: AdminShootingRangePriceListComponent;
  let fixture: ComponentFixture<AdminShootingRangePriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShootingRangePriceListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShootingRangePriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
