import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSafetyRegulationsComponent } from './public-safety-regulations.component';

describe('PublicSafetyRegulationsComponent', () => {
  let component: PublicSafetyRegulationsComponent;
  let fixture: ComponentFixture<PublicSafetyRegulationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicSafetyRegulationsComponent]
    });
    fixture = TestBed.createComponent(PublicSafetyRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
