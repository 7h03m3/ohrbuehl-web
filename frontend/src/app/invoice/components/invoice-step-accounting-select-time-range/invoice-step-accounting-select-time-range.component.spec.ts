import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStepAccountingSelectTimeRangeComponent } from './invoice-step-accounting-select-time-range.component';

describe('InvoiceStepAccountingSelectTimeRangeComponent', () => {
  let component: InvoiceStepAccountingSelectTimeRangeComponent;
  let fixture: ComponentFixture<InvoiceStepAccountingSelectTimeRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceStepAccountingSelectTimeRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceStepAccountingSelectTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
