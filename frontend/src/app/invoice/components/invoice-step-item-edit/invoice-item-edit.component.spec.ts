import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemEditComponent } from './invoice-item-edit.component';

describe('InvoiceItemEditComponent', () => {
  let component: InvoiceItemEditComponent;
  let fixture: ComponentFixture<InvoiceItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
