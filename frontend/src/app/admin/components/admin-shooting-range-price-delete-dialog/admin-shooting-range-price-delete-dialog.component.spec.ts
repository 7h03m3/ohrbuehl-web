import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShootingRangePriceDeleteDialogComponent } from './admin-shooting-range-price-delete-dialog.component';

describe('AdminBulletPriceDeleteDialogComponent', () => {
  let component: AdminShootingRangePriceDeleteDialogComponent;
  let fixture: ComponentFixture<AdminShootingRangePriceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShootingRangePriceDeleteDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShootingRangePriceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
