import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingRangeInvoicesComponent} from './shooting-range-invoices.component';

describe('ShootingRangeBillsComponent', () => {
  let component: ShootingRangeInvoicesComponent;
  let fixture: ComponentFixture<ShootingRangeInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShootingRangeInvoicesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
