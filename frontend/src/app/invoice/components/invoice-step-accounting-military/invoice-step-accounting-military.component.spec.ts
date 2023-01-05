import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStepAccountingMilitaryComponent } from './invoice-step-accounting-military.component';

describe('InvoiceStepAccountingMilitaryComponent', () => {
  let component: InvoiceStepAccountingMilitaryComponent;
  let fixture: ComponentFixture<InvoiceStepAccountingMilitaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceStepAccountingMilitaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceStepAccountingMilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
