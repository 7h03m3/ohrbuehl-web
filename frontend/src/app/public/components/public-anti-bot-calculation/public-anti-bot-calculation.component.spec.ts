import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAntiBotCalculationComponent } from './public-anti-bot-calculation.component';

describe('PublicAntiBotCalculationComponent', () => {
  let component: PublicAntiBotCalculationComponent;
  let fixture: ComponentFixture<PublicAntiBotCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicAntiBotCalculationComponent]
    });
    fixture = TestBed.createComponent(PublicAntiBotCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
