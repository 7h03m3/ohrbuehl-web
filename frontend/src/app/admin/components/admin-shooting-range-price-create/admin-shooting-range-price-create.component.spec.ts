import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShootingRangePriceCreateComponent } from './admin-shooting-range-price-create.component';

describe('AdminBulletPriceCreateComponent', () => {
  let component: AdminShootingRangePriceCreateComponent;
  let fixture: ComponentFixture<AdminShootingRangePriceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShootingRangePriceCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShootingRangePriceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
