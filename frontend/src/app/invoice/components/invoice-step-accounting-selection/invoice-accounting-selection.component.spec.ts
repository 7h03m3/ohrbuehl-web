import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAccountingSelectionComponent } from './invoice-accounting-selection.component';

describe('InvoiceAccountingSelectionComponent', () => {
  let component: InvoiceAccountingSelectionComponent;
  let fixture: ComponentFixture<InvoiceAccountingSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceAccountingSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceAccountingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
