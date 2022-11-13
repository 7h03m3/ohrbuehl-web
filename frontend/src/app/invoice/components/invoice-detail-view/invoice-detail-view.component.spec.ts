import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailViewComponent } from './invoice-detail-view.component';

describe('InvoiceDetailViewComponent', () => {
  let component: InvoiceDetailViewComponent;
  let fixture: ComponentFixture<InvoiceDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
