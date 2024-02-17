import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPricesComponent } from './public-prices.component';

describe('PublicPricesComponent', () => {
  let component: PublicPricesComponent;
  let fixture: ComponentFixture<PublicPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPricesComponent]
    });
    fixture = TestBed.createComponent(PublicPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
